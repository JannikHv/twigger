const config = require('../shared/config.json');
const fsx = require('fs-extra');

module.exports = async (_) => {
  fsx.emptyDirSync(config.base.output);
};