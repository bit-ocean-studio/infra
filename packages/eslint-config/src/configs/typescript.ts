import { ConfigBuilder } from '../config-builder'

const typescriptConfig = new ConfigBuilder(
  {
    extends: [
      'eslint:recommended',
      'airbnb-base',
      'airbnb-typescript/base',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:import/errors',
      'plugin:import/warnings',
      'prettier'
    ],
    plugins: ['@typescript-eslint', 'simple-import-sort', 'import', 'unused-imports'],
    env: {
      browser: true,
      es2024: true,
      node: true
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
    }
  },
  {
    typescript: true
  }
).build()
export default typescriptConfig
