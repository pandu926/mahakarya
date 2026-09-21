import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import react from 'eslint-plugin-react';

export default [
  { ignores: ['dist', 'coverage', 'node_modules'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
      globals: { window: 'readonly', document: 'readonly', HTMLElement: 'readonly', HTMLInputElement: 'readonly', HTMLTextAreaElement: 'readonly', requestAnimationFrame: 'readonly', cancelAnimationFrame: 'readonly' },
    },
    plugins: { 'react-hooks': reactHooks, react },
    settings: { react: { version: 'detect' } },
    rules: { ...reactHooks.configs.recommended.rules, ...react.configs.flat.recommended.rules, 'react/react-in-jsx-scope': 'off', 'react/prop-types': 'off', 'no-unused-vars': ['error', { argsIgnorePattern: '^_' }] },
  },
];
