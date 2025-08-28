// @ts-check
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import neostandard, { resolveIgnoresFromGitignore } from 'neostandard'
import globals from 'globals';

export default [
  {
    ignores: ['eslint.config.mjs', 'commitlint.config.mjs'],
  },
  ...neostandard({
    ignores: resolveIgnoresFromGitignore(),
    ts: true
  }),
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
  },
  {
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    }
  }
]