const yargs = require('yargs');
const R = require('ramda');

const { logError } = require('./commands-util/util');
const toolkit = require('./toolkit-instance');

const commandHandlersWithToolkit = R.mapObjIndexed(function(func) {
  return R.partial(func, [toolkit]);
}, {
  'downloadExport': require('./commands-util/handle-download-export'),
  'download': require('./commands-util/handle-download'),
  'export': require('./commands-util/handle-export'),
  'ls': require('./commands-util/handle-ls'),
  'push': require('./commands-util/handle-push'),
  'validation': require('./commands-util/handle-validation')
});

const commands = toolkit.cctConfig.commands;

if (Array.isArray(commands)) {
  commands.forEach(function(module) {
    yargs.command({
      ...module,
      async handler(argv) {
        try {
          await module.handler(argv, toolkit, commandHandlersWithToolkit);
        } catch (error) {
          logError(error);
          process.exit(1);
        }
      }
    })
    .help()
    .version(false)
  });
}