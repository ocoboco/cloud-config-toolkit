const { yellow, red } = require('chalk');

const toolkit = require('../toolkit-instance');
const handleValidation = require('../commands-util/handle-validation');

exports.command = 'validate <path>';
exports.desc = 'Validates the configuration file at specified path.';
exports.handler = async function(...args) {
  try {
    await handleValidation(toolkit, ...args);
  } catch (error) {
    if (error.explanation) {
      console.log(yellow(error.explanation));
    }
    console.log(red(error.message));
    process.exit(1);
  }
};