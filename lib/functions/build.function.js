const fs = require('fs');
const path = require('path');
const Glob = require('glob');
const util = require('util');
const cwd = require('process').cwd();
const Twig = require('twig');
const syncDirectory = require('sync-directory');
const sass = require('node-sass');
const config = require('../shared/config.json');
const UglifyJS = require('uglify-js');

Twig.renderFileAsync = util.promisify(Twig.renderFile);
Twig.cache(false);

const readTwiggerConfig = () => {
  const configPath = path.join(cwd, 'twigger-config.json');
  const userConfig = (fs.existsSync(configPath)) ? require(configPath) : { };
  const defaultConfig = require('../shared/twigger-config.json');

  return { ...defaultConfig, ...userConfig };
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

const renderStyles = async ({ cssOutputStyle }) => {
  const { input, output } = config.mapping.styles;
  const inFile = path.join(cwd, input, 'style.scss');
  const outFile = path.join(cwd, output, 'style.css');

  const { css } = sass.renderSync({
    file: inFile,
    outputStyle: cssOutputStyle,
    outFile: outFile
  });

  fs.writeFileSync(outFile, css);
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

module.exports = async (_) => {
  const config = readTwiggerConfig();

  console.time('Build');
  await renderPages(config);
  await renderAssets(config);
  await renderStyles(config);
  await renderJs(config);
  console.timeEnd('Build');
};