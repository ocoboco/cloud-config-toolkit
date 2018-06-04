const R = require('ramda');

const AjvCreator = require('./ajv-creator');

class Validator {
  constructor({ schema, keywords = [] }) {
    this.schema = schema;
    this.ajvInstance = AjvCreator.create(keywords);
  }

  isValid(configuration) {
    return this.ajvInstance.validate(this.schema, R.clone(configuration));
  }

  getErrors(configuration) {
    const valid = this.ajvInstance.validate(this.schema, R.clone(configuration));
    if (!valid) {
      return this.ajvInstance.errors; 
    }
    return [];
  }
}

module.exports = Validator;