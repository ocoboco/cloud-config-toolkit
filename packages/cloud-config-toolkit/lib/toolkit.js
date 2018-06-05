const validateCctConfig = require('./validate-cct-config');
const ActionValidate = require('./actions/validate');

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
    this.actionValidate = new ActionValidate({ validator });
  }

  validate(configuration) {
    return this.actionValidate.validate(configuration);
  }

  serialize(configuration) {
    return this.cctConfig.serialize(configuration);
  }

  deserialize(string) {
    return this.cctConfig.deserialize(string);
  }
}

module.exports = Toolkit;