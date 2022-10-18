const config = require('../config/config.json');
const fsx = require('fs-extra');

module.exports = async (_) => {
  console.time('Clear');
  fsx.emptyDirSync(config.base.output);
  console.timeEnd('Clear');
};