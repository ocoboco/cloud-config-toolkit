#!/usr/bin/env node

const chalk = require('chalk');
let cctConfig;

try {
  config = require(process.cwd() + '/cct-config.js');
} catch (error) {
  console.log(chalk.yellow('cct-config.js') + chalk.red(' must be specified in the project root directory.\n'));
  throw error;
}