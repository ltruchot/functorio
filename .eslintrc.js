module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript',
    'plugin:rxjs/recommended',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['*.css'],
  plugins: ['import', '@typescript-eslint'],
  rules: {
    indent: 'off',
    'max-len': ['error', 120],
    'no-console': 'off',
    'no-irregular-whitespace': 'error',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-use-before-define': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unused-modules': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/jsx-filename-extension': 'off',
  },
};
