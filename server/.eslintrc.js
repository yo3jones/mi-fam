module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    describe: 'readonly',
    beforeEach: 'readonly',
    beforeAll: 'readonly',
    afterEach: 'readonly',
    afterAll: 'readonly',
    it: 'readonly',
    expect: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
  },
};
