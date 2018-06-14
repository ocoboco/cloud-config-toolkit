const checkCctConfig = require('./check-cct-config');
const ValidatorDelegate = require('./delegates/validator');
const ExporterDelegate = require('./delegates/exporter');
const StorageDelegate = require('./delegates/storage');

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
    this.createDelegates();
  }

  createDelegates() {
    const { validator, exporter, serialize, storage } = this.cctConfig;
    this.validatorDelegate = new ValidatorDelegate({ validator });
    this.exporterDelegate = new ExporterDelegate({ exporter });
    this.storageDelegate = new StorageDelegate({ storage, serialize });
  }

  validate(configuration) {
    return this.validatorDelegate.validate(configuration);
  }

  serialize(configuration) {
    return this.cctConfig.serialize(configuration);
  }

  deserialize(string) {
    return this.cctConfig.deserialize(string);
  }

  export(configuration) {
    return this.exporterDelegate.export(configuration);
  }

  push(configuration, version, namespace) {
    return this.storageDelegate.push(configuration, version, namespace);
  }
}

module.exports = Toolkit;