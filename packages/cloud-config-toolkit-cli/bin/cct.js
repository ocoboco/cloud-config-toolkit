#!/usr/bin/env node

const yargs = require('yargs');
const chalk = require('chalk');

const modulesAvailable = require('./modules-available');

const result = modulesAvailable([
  './cct.conf.js',
  'cloud-config-toolkit'
]);

if (result != null) {
  const { error, modulePath } = result;
  if (error.code === 'MODULE_NOT_FOUND') {
    switch (modulePath) {
      case './cct.conf.js':
      console.log(chalk.red('Error: ') + chalk.green('cct.conf.js') + ' configuration file not found in the project directory.');
        break;
      default:
        console.log(chalk.red('Error: ') + chalk.green(modulePath) + ' not found in the project directory.');
    }
    
  } else {
    throw error;
  }
  process.exit(1);
}

yargs
  .commandDir('commands')
  .demandCommand()
  .help(true)
  .version(false);

require('./user-defined');

yargs.argv;