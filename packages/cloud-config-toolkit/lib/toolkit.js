const validateCctConfig = require('./validate-cct-config');
const ValidatorDelegate = require('./delegates/validate');

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
    validateCctConfig(this.cctConfig);
    this.createActions();
  }

  createActions() {
    const { validator } = this.cctConfig;
    this.validatorDelegate = new ValidatorDelegate({ validator });
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
}

module.exports = Toolkit;