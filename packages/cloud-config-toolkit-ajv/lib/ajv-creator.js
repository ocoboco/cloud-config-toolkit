const Ajv = require('ajv');

class AjvCreator {
  constructor(keywords) {
    this.keywords = keywords;
    this.createAjvInstance();
  }

  createAjvInstance() {
    this.ajvInstance = new Ajv({
      useDefaults: true
    });
    this.addCustomKeywords();
  }

  addCustomKeywords() {
    this.keywords.forEach(({ name, props }) => {
      this.ajvInstance.addKeyword(name, props);      
    });
  }

  getAjvInstance() {
    return this.ajvInstance;
  }
}

module.exports = Validation;