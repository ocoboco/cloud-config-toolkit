const toolkit = require('../toolkit-instance');
const handleExport = require('../commands-util/handle-export');
const { logError } = require('../commands-util/util');

exports.command = ['export <path>', 'e <path>'];
exports.desc = 'Exports configuration.';
exports.builder = {
  'destination': {
    alias: 'd',
    describe: 'Export destination path',
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