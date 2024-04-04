import type { Linter } from 'eslint'

export const astroRules: Linter.RulesRecord = {
  'react/no-unknown-property': 'off',
  'react/jsx-filename-extension': [1, { extensions: ['.astro'] }],
  'consistent-return': 'off'
}

export const buildAstroOverrides = (
  project: string
): Linter.ConfigOverride<Linter.RulesRecord> => ({
  files: ['*.astro'],
  parser: 'astro-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.astro'],
    project,
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  globals: {
    Astro: 'readonly'
  },
  rules: astroRules,
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    }
  }
})
