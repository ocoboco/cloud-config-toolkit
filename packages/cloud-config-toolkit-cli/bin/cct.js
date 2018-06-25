#!/usr/bin/env node

const yargs = require('yargs');
const chalk = require('chalk');

const modulesAvailable = require('./modules-available');

const result = modulesAvailable([
  './cct-config.js',
  'cloud-config-toolkit'
]);

if (result != null) {
  const { error, modulePath } = result;
  if (error.code === 'MODULE_NOT_FOUND') {
    console.log(chalk.red('Error: ') + chalk.green(modulePath) + ' not found in the project directory.\n');
  }
  throw error;
}

yargs
  .commandDir('commands')
  .demandCommand()
  .help(true)
  .version(false);

require('./user-defined');

yargs.argv;