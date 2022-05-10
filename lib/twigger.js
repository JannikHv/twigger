const minimist = require('minimist');
const helpFunction = require('./functions/help.function');
const versionFunction = require('./functions/version.function');
const initFunction = require('./functions/init.function');
const buildFunction = require('./functions/build.function');
const serveFunction = require('./functions/serve.function');
const clearFunction = require('./functions/clear.function');

module.exports = async (args) => {
  args = args || minimist(process.argv.slice(2), { string: ['_'] });

  if (args.h || args.help) {
    await helpFunction(args);
  } else if (args.v || args.version) {
    await versionFunction(args);
  } else if (args._[0] === 'init') {
    await initFunction(args);
  } else if (args._[0] === 'build') {
    await buildFunction(args);
  } else if (args._[0] === 'serve') {
    await serveFunction(args, buildFunction);
  } else if (args._[0] === 'clear') {
    await clearFunction(args);
  } else {
    await helpFunction(args);
  }
};