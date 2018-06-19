const checkCctConfig = require('./check-cct-config');

const cctConfigDefaults = {
  serialize: JSON.stringify,
  deserialize: JSON.parse,
};

class Toolkit {
  constructor(cctConfig) {
    this.cctConfig = {
      ...cctConfigDefaults,
      ...cctConfig
    };
    checkCctConfig(this.cctConfig);
  }

  exportEnabled() {
    return 'exporter' in this.cctConfig;
  }

  validate(configuration) {
    return {
      isValid: this.cctConfig.validator.isValid(configuration),
      errors: this.cctConfig.validator.getErrors(configuration)
    };
  }

  serialize(configuration) {
    return this.cctConfig.serialize(configuration);
  }

  deserialize(string) {
    return this.cctConfig.deserialize(string);
  }

  export(configuration) {
    if (!this.exportEnabled()) {
      throw new Error(`'config.exporter' is not defined.`);
    }
    return this.cctConfig.exporter.export(configuration);
  }

  push(configuration, version, namespace) {
    const serializedConfiguration = this.cctConfig.serialize(configuration);
    this.cctConfig.storage.createItem(version, serializedConfiguration, namespace);
  }

  itemExists(version, namespace) {
    return this.cctConfig.storage.itemExists(version, namespace);
  }

  getItemNames(namespace, offset, limit) {
    return this.cctConfig.storage.getItemNames(namespace, offset, limit);
  }
}

module.exports = Toolkit;