const path = require('path')

module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'google',
    'plugin:eslint-comments/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js', '.json'],
      },
      typescript: {
        directory: [path.resolve(__dirname, 'tsconfig.json')],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'require-jsdoc': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prefer-promise-reject-errors': 'off',
  },
}
