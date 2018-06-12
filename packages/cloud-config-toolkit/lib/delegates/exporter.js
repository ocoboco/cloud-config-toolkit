class ExporterDelegate {
  constructor({ exporter, validator }) {
    this.exporter = exporter;
    this.validator = validator;
  }

  export(configuration) {
    if (!this.exporter) {
      throw new Error(`'config.exporter' is not defined.`);
    }
    if (!this.validator.isValid(configuration)) {
      throw new Error('Configuration is invalid.');
    }
    return this.exporter.export(configuration);
  }
}

module.exports = ExporterDelegate;