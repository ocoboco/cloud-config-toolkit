const validateCctConfig = require('./validate-cct-config');
const ActionValidate = require('./actions/validate');

class ToolkitFacade {
  constructor(cctConfig) {
    this.cctConfig = cctConfig;
    validateCctConfig(cctConfig);
    this.createActions();
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