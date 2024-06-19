import { ConfigBuilder } from '../config-builder'

const nextConfig = new ConfigBuilder(
  {
    extends: [
      'next/core-web-vitals',
      'plugin:tailwindcss/recommended',
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
    next: true,
    react: true,
    typescript: true,
    tailwind: true
  }
).build()
export default nextConfig
