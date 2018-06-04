const Ajv = require('ajv');

class AjvCreator {
  static create(keywords) {
    const ajvInstance = new Ajv({
      useDefaults: true
    });
    this.addCustomKeywords(ajvInstance, keywords);
    return ajvInstance;
  }

  static addCustomKeywords(ajvInstance, keywords) {
    keywords.forEach(({ name, definition }) => {
      ajvInstance.addKeyword(name, definition);      
    });
  }
}

module.exports = AjvCreator;