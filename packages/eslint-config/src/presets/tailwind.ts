import type { Linter } from 'eslint'

export const tailwindRules: Linter.RulesRecord = {
  'tailwindcss/classnames-order': 'error',
  'tailwindcss/enforces-shorthand': 'error',
  'tailwindcss/enforces-negative-arbitrary-values': 'error',
  'tailwindcss/no-contradicting-classname': 'warn',
  'tailwindcss/no-custom-classname': 'off',
  'tailwindcss/no-unnecessary-arbitrary-value': 'error'
}
