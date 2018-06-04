const AjvCreator = require('./ajv-creator');

class Exporter {
  constructor({ schema, keywords = [] }) {
    this.schema = schema;
    this.ajvInstance = AjvCreator.creator(keywords);
  }

  export(configuration) {
    const exportedConfiguration = R.clone(configuration);
    const valid = ajv.validate(this.schema, exportedConfiguration);
    if (!valid) {
      throw new Error('Configuration is not valid.'); 
    }
    return exportedConfiguration;
  }
}

module.exports = Exporter;