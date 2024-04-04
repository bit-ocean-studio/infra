import type { Linter } from 'eslint'

export const reactRefreshRules: Linter.RulesRecord = {
  'react-refresh/only-export-components': [
    'warn',
    {
      allowConstantExport: true,
      allowExportNames: []
    }
  ]
}
