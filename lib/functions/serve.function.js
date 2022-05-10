const watch = require('node-watch');
const express = require('express');
const open = require('open');
const config = require('../shared/config.json');

module.exports = async (args, buildFn) => {
  await buildFn(args);

  watch(config.base.input, { recursive: true }, async () => {
    console.log('Change detected, rebuilding...');
    await buildFn(args);
  });

  const app = express();

  app.use(express.static(config.base.output, { extensions: ['html']}));

  app.listen(8080, () => open('http://localhost:8080'));
};