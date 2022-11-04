const fs = require('fs');
const yaml = require('yaml');
const path = require('path');
const twiggerConfigPath = path.join(__dirname, '../template/twigger-config.yaml');

module.exports = () => yaml.parse(fs.readFileSync(twiggerConfigPath, 'utf-8'));