const minimist = require('minimist');

const getHelpFunction = () => require('./functions/help.function');
const getVersionFunction = () => require('./functions/version.function');
const getInitFunction = () => require('./functions/init.function');
const getBuildFunction = () => require('./functions/build.function');
const getServeFunction = () => require('./functions/serve.function');
const getClearFunction = () => require('./functions/clear.function');

module.exports = async (args) => {
  args = args || minimist(process.argv.slice(2), { string: ['_'] });

  if (args.h || args.help) await getHelpFunction()(args);
  else if (args.v || args.version) await getVersionFunction()(args);
  else if (args._[0] === 'init') await getInitFunction()(args);
  else if (args._[0] === 'build') await getBuildFunction()(args);
  else if (args._[0] === 'serve') await getServeFunction()(args, getBuildFunction());
  else if (args._[0] === 'clear') await getClearFunction()(args);
  else await getHelpFunction()(args);
};