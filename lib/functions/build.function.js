const fs = require('fs');
const path = require('path');
const Glob = require('glob');
const util = require('util');
const cwd = require('process').cwd();
const yaml = require('yaml');
const Twig = require('twig');
const syncDirectory = require('sync-directory');
const nanocolors = require('nanocolors');
const sass = require('sass');
const config = require('../config/config.json');
const UglifyJS = require('uglify-js');
const defaultTwiggerConfig = require('../shared/read-twigger-config')();

Twig.renderFileAsync = util.promisify(Twig.renderFile);
Twig.cache(false);

const readTwiggerConfig = () => {
  const configPathJson = path.join(cwd, 'twigger-config.json');
  const userConfigJson = (fs.existsSync(configPathJson)) ? require(configPathJson) : { };

  const configPathYaml = path.join(cwd, 'twigger-config.yaml');
  const userConfigYaml = (fs.existsSync(configPathYaml)) ? yaml.parse(fs.readFileSync(configPathYaml, 'utf-8')) : { };

  if (fs.existsSync(configPathJson)) {
    console.log(`${nanocolors.yellow('[~]')} Using ${nanocolors.bold('twigger-config.json')} is deprecated; use ${nanocolors.bold('twigger-config.yaml')} instead.`);
  }

  if (!fs.existsSync(configPathYaml)) {
    console.log(`${nanocolors.yellow('[~]')} No ${nanocolors.bold('twigger-config.yaml')} found.`);
  }

  return { ...defaultTwiggerConfig, ...userConfigJson, ...userConfigYaml };
};

const renderPages = async ({ templateVariables }) => {
  const { input, output } = config.mapping.pages;

  const pages = Glob.glob.sync(`${input}/**/*.twig`);

  for (const page of pages) {
    const destination = page
      .replace('.html.twig', '.html')
      .replace('.twig', '.html')
      .replace(input, output);
    const destinationPath = path.dirname(destination);
    const html = await Twig.renderFileAsync(page, templateVariables);

    fs.mkdirSync(destinationPath, { recursive: true });
    fs.writeFileSync(destination, html);
  }
};

const renderAssets = async (_) => {
  const { input, output } = config.mapping.assets;

  await syncDirectory(path.join(cwd, input), path.join(cwd, output));
};

const renderStyles = async ({ cssOutputStyle, cssSourceMap }) => {
  const { input, output } = config.mapping.styles;
  const inFile = path.join(cwd, input, 'style.scss');
  const outFileCss = path.join(cwd, output, 'style.css');
  const outFileCssMap = path.join(cwd, output, 'style.css.map');
  const { css, sourceMap } = sass.compile(inFile, {
    sourceMap: cssSourceMap,
    cssOutputStyle: cssOutputStyle
  });

  fs.writeFileSync(outFileCss, css);

  if (cssSourceMap) {
    fs.writeFileSync(outFileCssMap, JSON.stringify(sourceMap, null, 2));
  } else if (fs.existsSync(outFileCssMap)) {
    fs.unlinkSync(outFileCssMap);
  }

  fs.appendFileSync(outFileCss, '/*# sourceMappingURL=style.css.map */');
};

const renderJs = async ({ minifyJs }) => {
  const { input, output } = config.mapping.js;

  const scripts = Glob.glob.sync(`${input}/**/*.js`);

  for (const script of scripts) {
    const destination = script.replace(input, output);
    const destinationPath = path.dirname(destination);
    let javascript = fs.readFileSync(script, 'utf-8');

    if (minifyJs) {
      javascript = UglifyJS.minify(javascript, {
        mangle: { toplevel: true }
      }).code;
    }

    fs.mkdirSync(destinationPath, { recursive: true });
    fs.writeFileSync(destination, javascript);
  }
};

let buildCount = 0;

module.exports = async ({ countBuilds = false }) => {
  const config = readTwiggerConfig();
  const timer = (countBuilds) ? `Build ${++buildCount}` : 'Build';

  console.time(timer);
  await renderPages(config);
  await renderAssets(config);
  await renderStyles(config);
  await renderJs(config);
  console.timeEnd(timer);
};