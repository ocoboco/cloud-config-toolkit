class ExporterDelegate {
  constructor({ exporter }) {
    this.exporter = exporter;
  }

  export(configuration) {
    if (!this.exporter) {
      throw new Error(`'config.exporter' is not defined.`);
    }
    return this.exporter.export(configuration);
  }
}

module.exports = ExporterDelegate;