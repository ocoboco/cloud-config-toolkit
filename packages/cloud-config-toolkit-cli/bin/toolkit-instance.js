const importCwd = require('import-cwd');

const Toolkit = importCwd('cloud-config-toolkit');
const cctConfig = importCwd('./cct.conf.js');

module.exports = new Toolkit(cctConfig);