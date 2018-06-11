const toolkit = require('../toolkit-instance');
const handleFileValidation = require('../commands-util/validate/handle-file-validation');

exports.command = 'validate <path>';
exports.desc = 'Validates the configuration file at specified path.';
exports.handler = async function(...args) {
  try {
    await handleFileValidation(toolkit, ...args);
  } catch (error) {
    process.exit(1);
  }
};