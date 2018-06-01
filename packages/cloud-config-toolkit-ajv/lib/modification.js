const AjvCreator = require('./ajv-creator');

class Modification {
  constructor({ schema, keywords = [] }) {
    this.schema = schema;
    this.ajvInstance = AjvCreator.creator(keywords);
  }

  
}