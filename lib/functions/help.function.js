const nanocolors = require('nanocolors');

const helpText = `Usage: twigger <command>

Commands / Arguments:
  ${nanocolors.bold('-h, --help')}    - Show help screen
  ${nanocolors.bold('-v, --version')} - Show installed version
  ${nanocolors.bold('init')}          - Init twigger in current directory
  ${nanocolors.bold('build')}         - Build current twigger application
  ${nanocolors.bold('serve')}         - Serve current twigger application
  ${nanocolors.bold('clear')}         - Clears the public directory
`;

module.exports = async (_) => console.log(helpText);