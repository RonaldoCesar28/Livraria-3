import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    rules: {
      'indent': 'off',
      'linebreak-style': 'off',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
    },
  },

  // Configuração específica para arquivos de teste
  {
    files: ['**/*.test.{js,mjs,cjs}', '**/*.spec.{js,mjs,cjs}', '**/tests/**/*.{js,mjs,cjs}'],
    rules: {
      'no-undef': 'off',
    },
  },
];