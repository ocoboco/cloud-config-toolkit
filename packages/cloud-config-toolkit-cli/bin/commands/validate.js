const toolkit = require('../toolkit-instance');
const handleValidation = require('../commands-util/handle-validation');
const { logError } = require('../commands-util/util');

exports.command = 'validate <path>';
exports.desc = 'Validates the configuration file at specified path.';
exports.handler = async function(...args) {
  try {
    await handleValidation(toolkit, ...args);
  } catch (error) {
    logError(error);
    process.exit(1);
  }
};