const fs = require('fs');
const path = require('path');
const Glob = require('glob');
const util = require('util');
const cwd = require('process').cwd();
const Twig = require('twig');
const syncDirectory = require('sync-directory');
const sass = require('node-sass');
const config = require('../shared/config.json');

Twig.renderFileAsync = util.promisify(Twig.renderFile);
Twig.cache(false);

const renderPages = async () => {
  const { input, output } = config.mapping.pages;

  const pages = Glob.glob.sync(`${input}/**/*.twig`);

  for (const page of pages) {
    const destination = page
      .replace('.html.twig', '.html')
      .replace('.twig', '.html')
      .replace(input, output);
    const destinationPath = path.dirname(destination);
    const html = await Twig.renderFileAsync(page);

    fs.mkdirSync(destinationPath, { recursive: true });
    fs.writeFileSync(destination, html);
  }
};

const renderAssets = async () => {
  const { input, output } = config.mapping.assets;

  await syncDirectory(path.join(cwd, input), path.join(cwd, output));
};

const renderStyles = async () => {
  const { input, output } = config.mapping.styles;
  const inFile = path.join(cwd, input, 'style.scss');
  const outFile = path.join(cwd, output, 'style.css');

  const { css } = sass.renderSync({
    file: inFile,
    outputStyle: 'compressed',
    outFile: outFile
  });

  fs.writeFileSync(outFile, css);
};

const renderJs = async () => {
  const { input, output } = config.mapping.js;

  await syncDirectory(path.join(cwd, input), path.join(cwd, output));
};

module.exports = async (_) => {
  console.time('Build');
  await renderPages();
  await renderAssets();
  await renderStyles();
  await renderJs();
  console.timeEnd('Build');
};