const yargs = require('yargs');
const R = require('ramda');

const toolkit = require('./toolkit-instance');

const commands = toolkit.cctConfig.commands;

if (typeof commands === 'object') {
  R.toPairs(commands).forEach(function([name, handler]) {
    yargs.command({
      command: name,
      description: `User defined command "${name}".`,
      handler: R.partial(handler, [toolkit])
    })
    .help()
    .version(false)
  });
}