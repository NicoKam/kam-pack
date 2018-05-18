'use strict';

const fs = require('fs');
const path = require('path');

const DEV_CONFIG_FILE = '.kam.dev.config.js';
const DEV_OTHER_CONFIG_FILE = '.kam.dev.other.config.js';
const PROD_CONFIG_FILE = '.kam.prod.config.js';

const realPath = 'C:/project/total-factor-search-fe';//||fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(realPath, relativePath);

module.exports = {
  realPath,
  resolveApp,
  get buildPath() {
    return resolveApp('build');
  },
  get srcPath() {
    return resolveApp('src');
  },
  get nodeModulesPath() {
    return resolveApp('node_modules');
  },
  get devCustomConfigPath() {
    return resolveApp(DEV_CONFIG_FILE);
  },
  get devOtherConfigPath() {
    return resolveApp(DEV_OTHER_CONFIG_FILE);
  },
  get prodCustomConfigPath() {
    return resolveApp(PROD_CONFIG_FILE);
  },
};
