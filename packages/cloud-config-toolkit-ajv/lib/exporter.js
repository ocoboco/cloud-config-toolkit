const R = require('ramda');

const AjvCreator = require('./ajv-creator');

class Exporter {
  constructor({ schema, keywords = [] }) {
    this.schema = schema;
    this.ajvInstance = AjvCreator.create(keywords);
  }

  export(configuration) {
    const exportedConfiguration = R.clone(configuration);
    const valid = this.ajvInstance.validate(this.schema, exportedConfiguration);
    if (!valid) {
      throw new Error('Cannot export an invalid configuration.'); 
    }
    return exportedConfiguration;
  }
}

module.exports = Exporter;