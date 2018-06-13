module.exports = {
  'extends': './node_modules/eslint-config-google/index.js',
  'parserOptions': {
    'ecmaVersion': 2017,
  },
  'rules': {
    'eol-last': 0,
    'max-len': ['error', 200, 2, {ignoreComments: true}],
  },
};