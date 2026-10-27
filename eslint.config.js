import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'warn'
    }
  },
  eslintConfigPrettier
];
