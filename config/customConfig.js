'use strict';

const { devCustomConfigPath, prodCustomConfigPath, devOtherConfigPath } = require('./paths');
const fs = require('fs');

let devCustomConfig = {};
let prodCustomConfig = {};
let devOtherConfig = {};

if (fs.existsSync(devCustomConfigPath)) {
  devCustomConfig = require(devCustomConfigPath);
}

if (fs.existsSync(prodCustomConfigPath)) {
  prodCustomConfig = require(prodCustomConfigPath);
}

if (fs.existsSync(devOtherConfigPath)) {
  devOtherConfig = require(devOtherConfigPath);
}

module.exports = { devCustomConfig, prodCustomConfig, devOtherConfig };
