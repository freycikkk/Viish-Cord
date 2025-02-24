/** @format */

import globals from 'globals';
import jslint from '@eslint/js';
import tslint from 'typescript-eslint';

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  { files: ['{src}/**/*.{ts}'] },
  { linterOptions: { noInlineConfig: true } },
  { languageOptions: { globals: globals.node } },
  jslint.configs.recommended,
  ...tslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];
