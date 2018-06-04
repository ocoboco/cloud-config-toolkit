const R = require('ramda');

const AjvCreator = require('./ajv-creator');

class Validation {
  constructor({ schema, keywords = [] }) {
    this.schema = schema;
    this.ajvInstance = AjvCreator.creator(keywords);
  }

  isValid(configuration) {
    return ajv.validate(this.schema, R.clone(configuration));
  }

  getValidationErrors(configuration) {
    const valid = ajv.validate(this.schema, R.clone(configuration));
    if (!valid) {
      return ajv.errors; 
    }
    return [];
  }
}

module.exports = Validation;