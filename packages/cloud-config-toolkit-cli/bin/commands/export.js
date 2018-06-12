const toolkit = require('../toolkit-instance');
const handleExport = require('../commands-util/handle-export');
const { logError } = require('../commands-util/util');

exports.command = 'export <path>';
exports.desc = 'Exports configuration to destination file.';
exports.builder = {
  'destination': {
    alias: 'd',
    describe: 'Destination path of the export',
    demandOption: true
  }
};
exports.handler = async function(...args) {
  try {
    await handleExport(toolkit, ...args);
  } catch (error) {
    logError(error);
    process.exit(1);
  }
};