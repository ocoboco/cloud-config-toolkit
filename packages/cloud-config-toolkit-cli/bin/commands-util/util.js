const { yellow, red } = require('chalk');

exports.logError = function(error) {
  if (error.explanation) {
    console.log(yellow(error.explanation));
  }
  console.log(red(error.message));
};