const validateCctConfig = require('./validate-cct-config');
const ActionValidate = require('./actions/validate');

class Toolkit {
  constructor(cctConfig) {
    this.cctConfig = cctConfig;
    validateCctConfig(cctConfig);
  }

  validate(string) {
    const { deserialize, validator } = this.cctConfig;
    const action = new ActionValidate(deserialize, validator);
    return action.validate(string);
  }
}

module.exports = Toolkit;