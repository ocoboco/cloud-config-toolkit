const fs = require('fs-extra');
const chalk = require('chalk');

const toolkit = require('../toolkit-instance');

exports.command = 'validate <path>'
exports.desc = 'Validates the configuration file at specified path.';

exports.handler = async function ({ path }) {
  try {
    await fs.access(path, fs.constants.R_OK);
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }

};