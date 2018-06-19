const toolkit = require('../toolkit-instance');
const handleDownloadExport = require('../commands-util/handle-download-export');
const { logError } = require('../commands-util/util');

exports.command = ['download-export', 'de'];
exports.desc = 'Downloads exported configuration from storage.';
exports.builder = {
  'destination': {
    alias: 'd',
    describe: 'Download destination path',
    demandOption: true
  },
  'version': {
    alias: 'v',
    describe: 'Exported configuration version',
    demandOption: true
  },
  'namespace': {
    alias: 'n',
    describe: 'Exported configuration namespace',
    demandOption: false,
    default: 'default'
  }
};
exports.handler = async function(...args) {
  try {
    await handleDownloadExport(toolkit, ...args);
  } catch (error) {
    logError(error);
    process.exit(1);
  }
};