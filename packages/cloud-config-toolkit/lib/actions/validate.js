class ActionValidate {
  constructor({ deserialize, validator }) {
    this.desearialize = this.desearialize;
    this.validator = this.validator;
  }

  validate(string) {
    const configuration = this.getConfiguration(string);
    const isValid = this.validator.isValid(configuration);
    if (isValid) {
      return {
        isValid,
        errors: []
      }
    };
    return {
      isValid,
      errors: this.validator.getErrors(configuration)
    };
  }

  getConfiguration(string) {
    return this.desearialize(string);
  }
}

module.exports = ActionValidate;