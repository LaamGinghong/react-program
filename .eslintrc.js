const path = require('path')

module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'standard',
    'plugin:import/typescript',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      typescript: path.resolve(__dirname, 'tsconfig.json'),
    },
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {},
}
