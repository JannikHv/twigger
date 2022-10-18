const express = require('express');
const open = require('open');
const config = require('../config/config.json');
const chokidar = require('chokidar');

const startDevServer = () => new Promise((resolve, reject) => {
  const app = express();

  app.use(express.static(config.base.output, { extensions: ['html']}));

  app.listen(8080, resolve);
  app.on('error', reject);
});

module.exports = async (args, buildFn) => {
  args.countBuilds = true;

  await buildFn(args);

  const watcher = chokidar.watch(config.base.input, {
    recursive: true,
    ignored: /(^|[\/\\])\../, // ignore dotfiles
  });

  const onChange = async () => {
    console.log('Change detected, rebuilding...');
    await buildFn(args);
  };

  watcher.on('change', onChange)

  await startDevServer();
  await open('http://localhost:8080');
};