module.exports = {
  'env': {
    'commonjs': true,
    'es6': true,
    'node': true,
    'mocha': true
  },
  'extends': [
    'eslint:recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
    'document': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'indent': ['error', 2],
    'semi': ['error', 'always'],
    'brace-style': [
      2,
      '1tbs'
    ],
    'quotes': [
      2,
      'single',
      {
        'avoidEscape': true
      }
    ]
  }
};