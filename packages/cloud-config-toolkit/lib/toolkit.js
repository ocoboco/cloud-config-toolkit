const validateCctConfig = require('./validate-cct-config');
const ActionValidate = require('./actions/validate');

class Toolkit {
  constructor(cctConfig) {
    this.cctConfig = this.fillWithDefaults(cctConfig);
    validateCctConfig(cctConfig);
    this.createActions();
  }

  fillWithDefaults(cctConfig) {
    return {
      serialize: JSON.serialize,
      deserialize: JSON.deserialize,
      ...cctConfig
    };
  }

  createActions() {
    const { deserialize, validator } = this.cctConfig;
    this.actionValidate = new ActionValidate({ deserialize, validator });
  }

  validate(string) {
    return this.actionValidate.validate(string);
  }
}

module.exports = Toolkit;