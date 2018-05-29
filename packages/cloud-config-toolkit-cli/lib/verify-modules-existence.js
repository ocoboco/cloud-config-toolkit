const importCwd = require('import-cwd');

module.exports = function verifyModulesExistence(modules) {
  for (let index = 0; index < modules.length; index++) {
    const modulePath = modules[index];
    try {
      importCwd(modulePath);
    } catch (error) {
      return {
        error,
        modulePath
      };
    }
  }
  return null;
};