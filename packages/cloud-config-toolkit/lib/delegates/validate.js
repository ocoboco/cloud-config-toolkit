class ValidatorDelegate {
  constructor({ validator }) {
    this.validator = validator;
  }

  validate(configuration) {
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
}

module.exports = ValidatorDelegate;