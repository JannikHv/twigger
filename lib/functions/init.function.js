const nanocolors = require('nanocolors');
const cwd = process.cwd();
const fs = require('fs');
const path = require('path');
const config = require('../shared/config.json');
const twiggerConfig = require('../shared/twigger-config.json');

module.exports = async () => {
  console.time('Init');

  for (const item of config.structure) {
    if (item.type === 'directory' && !fs.existsSync(item.path)) {
      console.log(`${nanocolors.green('[+]')} Creating directory ${nanocolors.bold(item.path)}`);

      fs.mkdirSync(item.path, { recursive: true });
    }

    if (item.type === 'file' && !fs.existsSync(item.path)) {
      console.log(`${nanocolors.green('[+]')} Creating file ${nanocolors.bold(item.path)}`);

      fs.writeFileSync(item.path, item.content);
    }
  }

  const configPath = path.join(cwd, 'twigger-config.json');

  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify(twiggerConfig, null, 2));

    console.log(`${nanocolors.green('[+]')} Creating file ${nanocolors.bold('twigger-config.json')}`);
  }

  console.timeEnd('Init');
};