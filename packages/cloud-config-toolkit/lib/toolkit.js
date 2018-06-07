const checkCctConfig = require('./check-cct-config');
const ValidatorDelegate = require('./delegates/validator');

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