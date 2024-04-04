import { ConfigBuilder } from '../config-builder'

const javascriptConfig = new ConfigBuilder({
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier'
  ],
  plugins: ['simple-import-sort', 'import', 'unused-imports'],
  env: {
    browser: true,
    es2024: true,
    node: true
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.cjs', '.mjs', '.ts', '.cts', '.mts', '.tsx', '.d.ts']
      }
    }
  }
}).build()
export default javascriptConfig
