// prettier.config.js
const adonisPrettierConfig = require('@adonisjs/prettier-config');

module.exports = {
  ...adonisPrettierConfig,
  semi: true,
  printWidth: 80,
  trailingComma: 'none',
  bracketSameLine: true
};
