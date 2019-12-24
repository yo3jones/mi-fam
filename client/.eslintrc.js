module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'prettier/react',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    describe: 'readonly',
    beforeEach: 'readonly',
    beforeAll: 'readonly',
    it: 'readonly',
    expect: 'readonly',
    jest: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'prettier/prettier': 'error',
    'react/display-name': ['off'],
    'react/prop-types': 0,
  },
};
