const yargs = require('yargs');
const R = require('ramda');

const toolkit = require('./toolkit-instance');
const commandHandlers = R.mapObjIndexed(function(func) {
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

if (typeof commands === 'object') {
  R.toPairs(commands).forEach(function([name, handler]) {
    yargs.command({
      command: name,
      description: `User defined command "${name}".`,
      handler: R.partialRight(handler, [toolkit, commandHandlers])
    })
    .help()
    .version(false)
  });
}