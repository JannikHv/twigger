const config = require('../shared/config.json');
const fsx = require('fs-extra');
const nanocolors = require('nanocolors');

module.exports = async (_) => {
  console.time('Clear');
  fsx.emptyDirSync(config.base.output);
  console.timeEnd('Clear');
};