const toolkit = require('../toolkit-instance');
const handleExport = require('../commands-util/handle-export');

exports.command = 'export <path>';
exports.desc = 'Exports configuration to destination file.';
exports.builder = {
  'destination': {
    alias: 'd',
    describe: 'destination file of the export',
    demandOption: true
  }
};
exports.handler = async function(...args) {
  try {
    await handleExport(toolkit, ...args);
  } catch (error) {
    process.exit(1);
  }
};