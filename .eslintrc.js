module.exports = {
  extends: ['standard', 'plugin:react/recommended'],
  plugins: ['react', 'jest'],
  env: {
    'jest/globals': true
  },
  rules: {
    'space-before-function-paren': 0,
    indent: 0
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
}
