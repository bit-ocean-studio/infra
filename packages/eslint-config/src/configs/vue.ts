import { ConfigBuilder } from '../config-builder'

const vueConfig = new ConfigBuilder(
  {
    extends: [
      'plugin:tailwindcss/recommended',
      'eslint:recommended',
      'airbnb-base',
      'airbnb-typescript/base',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:vue/vue3-recommended',
      'prettier'
    ],
    plugins: ['@typescript-eslint', 'simple-import-sort', 'import', 'unused-imports'],
    env: {
      browser: true,
      es2024: true
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ConfigBuilder.buildTypeScriptProject()
        },
        node: {
          extensions: ['.js', '.cjs', '.mjs', '.ts', '.cts', '.mts', '.tsx', '.d.ts']
        }
      }
    },
    /**
     * NOTE: `vue-eslint-parser` doesn't work in `overrides`.
     */
    parser: 'vue-eslint-parser',
    parserOptions: {
      project: ConfigBuilder.buildTypeScriptProject(),
      parser: '@typescript-eslint/parser',
      extraFileExtensions: ['.vue'],
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  {
    vue: true,
    typescript: true,
    tailwind: true
  }
).build()
export default vueConfig
