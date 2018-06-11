const checkCctConfig = require('./check-cct-config');
const ValidatorDelegate = require('./delegates/validator');
const ExporterDelegate = require('./delegates/exporter');

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
    const { validator, exporter } = this.cctConfig;
    this.validatorDelegate = new ValidatorDelegate({ validator });
    this.exporterDelegate = new ExporterDelegate({ exporter, validator });
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
}

module.exports = Toolkit;