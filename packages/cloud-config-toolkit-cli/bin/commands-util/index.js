const { yellow, red } = require('chalk');

exports.logError = function(explanation, error) {
  console.log(yellow(explanation));
  console.log(red(error.message));
};