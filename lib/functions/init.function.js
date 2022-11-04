const cwd = process.cwd();
const fse = require('fs-extra');
const path = require('path');
const templatePath = path.join(__dirname, '../template');

module.exports = async () => {
  console.time('Init');

  fse.copySync(templatePath, cwd, { overwrite: false });

  console.timeEnd('Init');
};