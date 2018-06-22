const _ = require('lodash');
const developpement = require('./developpement');
const _default = require('./default');
const dialog = require('./dialog');
const env = process.env.NODE_ENV;

const config = {
  _default,
  developpement,
  dialog,
};

let configObj = config._default;

if (config[env]) {
  configObj = _.merge(configObj, config[env]);
}

module.exports = configObj;