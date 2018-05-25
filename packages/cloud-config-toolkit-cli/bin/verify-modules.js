const importCwd = require('import-cwd');
const chalk = require('chalk');

try {
  importCwd('./cct-config.js');
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    console.log(chalk.red('Error: ') + chalk.yellow('cct-config.js') + ' not found in the project directory\n');
  }
  throw error;
}

try {
  importCwd('cloud-config-toolkit');
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    console.log(chalk.red('Error: ') + 
    chalk.yellow('cloud-config-toolkit') + 
    ' module not found. You might need to run ' +
    chalk.green('npm install --save cloud-config-toolkit')
    );
  }
  throw error;
}