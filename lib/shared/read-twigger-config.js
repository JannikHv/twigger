const fs = require('fs');
const cwd = require('process').cwd();
const yaml = require('yaml');
const path = require('path');
const twiggerConfigPath = path.join(__dirname, '../config/twigger-config.yaml');

module.exports = () => yaml.parse(fs.readFileSync(twiggerConfigPath, 'utf-8'));