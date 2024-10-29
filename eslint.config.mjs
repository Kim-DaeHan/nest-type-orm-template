import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    'standard',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ),
  {
    ignores: [
      'node_modules/',
      'dist/',
      'eslint.config.mjs',
      'prettier.config.mjs',
      'webpack-hmr.config.js',
      'test/**/*.ts',
    ],
    plugins: {
      prettier,
      '@typescript-eslint': tsEslintPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      'no-useless-constructor': 'off',
      'nonblock-statement-body-position': ['error', 'beside'],
      'object-curly-spacing': ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-alert': 'off',
      'global-require': 'off',
      'prefer-arrow-callback': 'error',
      'arrow-body-style': 'off',
      'no-param-reassign': 'off',
      'class-methods-use-this': 'off',
      'no-underscore-dangle': 'off',
      'import/no-cycle': 'off',
      'no-plusplus': 'off',

      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',

      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'object', 'type', 'index'],
          pathGroups: [
            {
              pattern: '@nestjs/**',
              group: 'external',
              position: 'before',
            },
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          allowSeparatedGroups: true,
        },
      ],
    },
  },
];
