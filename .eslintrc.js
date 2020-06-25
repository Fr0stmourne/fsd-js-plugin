module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'fsd',
    'import',
    '@typescript-eslint',
    "prettier",
    "jest",
    "babel",
  ],
  extends: [
    "plugin:fsd/all",
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
    "prettier/@typescript-eslint",
  ],
  rules: {
    "import/order": ["warn",
      {
        "groups": [["builtin", "external"], "internal", ["index","parent", "sibling" ]],
        "newlines-between": "always",
        "alphabetize": {"order": "asc", "caseInsensitive": true}
      },
    ],
  }
};