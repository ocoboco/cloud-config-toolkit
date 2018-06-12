const fs = require('fs-extra');
const { yellow, red } = require('chalk');

const handleValidation = require('./handle-validation');

async function handleExport(toolkit, { path, destination }) {
  handleValidation(toolkit, { path });

}

module.exports = handleExport;