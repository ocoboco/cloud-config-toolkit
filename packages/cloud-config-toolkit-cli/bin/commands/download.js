const toolkit = require('../toolkit-instance');
const handleDownload = require('../commands-util/handle-download');
const { logError } = require('../commands-util/util');

exports.command = 'download';
exports.desc = 'Downloads configuration from storage.';
exports.builder = {
  'destination': {
    alias: 'd',
    describe: 'Download destination path',
    demandOption: true
  },
  'version': {
    alias: 'v',
    describe: 'Configuration version',
    demandOption: true
  },
  'namespace': {
    alias: 'n',
    describe: 'Configuration namespace',
    demandOption: false,
    default: 'default'
  }
};
exports.handler = async function(...args) {
  try {
    await handleDownload(toolkit, ...args);
  } catch (error) {
    logError(error);
    process.exit(1);
  }
};