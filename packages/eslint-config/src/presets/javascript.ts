import type { Linter } from 'eslint'

export const javascriptRules: Linter.RulesRecord = {
  quotes: ['error', 'single'],
  semi: ['error', 'never'],
  'no-unused-vars': 'off',
  'class-methods-use-this': 'off',
  'max-classes-per-file': 'off',
  'no-param-reassign': [
    'warn',
    {
      props: true,
      ignorePropertyModificationsFor: [
        'target',
        'descriptor',
        'req',
        'request',
        'args',
        'draft',
        'acc',
        'props'
      ],
      ignorePropertyModificationsForRegex: ['^item', 'Item$']
    }
  ]
}

export const javascriptOverrides: Linter.ConfigOverride<Linter.RulesRecord> = {
  files: ['*.{js,cjs,mjs,jsx}'],
  extends: 'plugin:@typescript-eslint/disable-type-checked',
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-require-imports': 'off'
  }
}
