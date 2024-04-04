import type { Linter } from 'eslint'

export const typescriptRules: Linter.RulesRecord = {
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/comma-dangle': 'off',
  '@typescript-eslint/consistent-type-imports': 'error',
  '@typescript-eslint/triple-slash-reference': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false }],
  '@typescript-eslint/no-throw-literal': 'off'
}

export const buildTypescriptOverrides = (
  project: string
): Linter.ConfigOverride<Linter.RulesRecord> => ({
  files: ['*.{ts,tsx,cts,mts}'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project,
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-undef': 'off',
    'react/jsx-no-undef': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    }
  }
})

export const dtsOverrides: Linter.ConfigOverride<Linter.RulesRecord> = {
  files: ['*.d.ts'],
  rules: {
    'import/no-duplicates': 'off'
  }
}
