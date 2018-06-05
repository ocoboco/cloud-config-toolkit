const toolkit = require('../toolkit-instance');

exports.command = 'validate <configPath>'
exports.desc = 'Validate the configuration file';

exports.handler = function (argv) {
  console.log('Validate called for configPath', argv.configPath);
};