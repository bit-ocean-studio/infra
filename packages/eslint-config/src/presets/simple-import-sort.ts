import type { Linter } from 'eslint'

export const simpleImportSortRules: Linter.RulesRecord = {
  'simple-import-sort/imports': 'error',
  'simple-import-sort/exports': 'error'
}
