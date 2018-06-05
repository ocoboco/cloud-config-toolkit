const validateCctConfig = require('./validate-cct-config');
const ActionValidate = require('./actions/validate');

class Toolkit {
  constructor(cctConfig) {
    this.cctConfig = this.fillWithDefaults(cctConfig);
    validateCctConfig(this.cctConfig);
    this.createActions();
  }

  fillWithDefaults(cctConfig) {
    return {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
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