class Validation {
  constructor({ schema, keywords = [] }) {
    this.schema = schema;
    this.keywords = keywords;
    this.createAjvInstance();
  }

  
}

module.exports = Validation;