import type { Linter } from 'eslint'

export const importRules: Linter.RulesRecord = {
  'import/order': 'off',
  'import/first': 'error',
  'import/newline-after-import': 'error',
  'import/no-unresolved': 'off',
  'import/no-absolute-path': 'off',
  'import/no-duplicates': 'error',
  'import/extensions': 'off',
  'import/no-extraneous-dependencies': 'off',
  'import/no-mutable-exports': 'error',
  'import/no-self-import': 'error',
  'import/prefer-default-export': 'off'
}
