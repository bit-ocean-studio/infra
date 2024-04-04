import type { Linter } from 'eslint'

export const vueRules: Linter.RulesRecord = {
  'vue/no-v-html': 'off',
  'vue/multi-word-component-names': 'off',
  'vue/component-tags-order': ['error', { order: ['script', 'template', 'style'] }]
}

export const vueOverrides: Linter.ConfigOverride<Linter.RulesRecord> = {
  files: ['*.vue'],
  rules: {
    'no-undef': 'off'
  }
}
