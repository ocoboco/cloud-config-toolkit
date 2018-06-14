const toolkit = require('../toolkit-instance');
const handlePush = require('../commands-util/handle-push');
const { logError } = require('../commands-util/util');

exports.command = 'push <path>';
exports.desc = 'Push configuration to storage.';
exports.builder = {
  'version': {
    alias: 'v',
    describe: 'Version of the configurtion',
    demandOption: true
  },
  'namespace': {
    alias: 'ns',
    describe: 'Namespace of the configuration',
    demandOption: false,
    default: 'default'
  }
};
exports.handler = async function(...args) {
  try {
    await handlePush(toolkit, ...args);
  } catch (error) {
    logError(error);
    console.trace(error);
    process.exit(1);
  }
};