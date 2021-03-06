const _ = require('lodash');
const developpement = require('./developpement');
const production = require('./production');
const _default = require('./default');
const env = process.env.NODE_ENV;

const config = {
  _default,
  developpement,
  production,
};

let configObj = config._default;

if (config[env]) {
  configObj = _.merge(configObj, config[env]);
}

module.exports = configObj;