import { ConfigBuilder } from '../config-builder'

const reactNativeConfig = new ConfigBuilder(
  {
    extends: [
      'eslint:recommended',
      'airbnb',
      'airbnb-typescript',
      'airbnb/hooks',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      'plugin:@tanstack/eslint-plugin-query/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:import/errors',
      'plugin:import/warnings',
      'prettier'
    ],
    plugins: [
      '@typescript-eslint',
      'react',
      'react-native',
      'react-refresh',
      'simple-import-sort',
      'import',
      'unused-imports'
    ],
    globals: {
      React: true,
      JSX: true
    },
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
    reactNative: true,
    typescript: true
  }
).build()
export default reactNativeConfig
