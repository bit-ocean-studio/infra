import fs from 'node:fs'
import { join, resolve } from 'node:path'

import type { Linter } from 'eslint'
import { rules } from 'eslint-plugin-jsx-a11y'

import {
  buildAstroOverrides,
  buildTypescriptOverrides,
  dtsOverrides,
  importRules,
  javascriptOverrides,
  javascriptRules,
  reactNativeRules,
  reactRefreshRules,
  reactRules,
  simpleImportSortRules,
  tailwindRules,
  typescriptRules,
  unusedImportsRules,
  vueOverrides,
  vueRules
} from './presets'
import type { ConfigBuilderOptions } from './types'

export class ConfigBuilder {
  /**
   * ESLint config
   */
  private readonly config: Linter.Config

  /**
   * ESLint ignore patterns
   */
  private readonly ignorePatterns = [
    'node_modules',
    'dist',
    'src-tauri',
    '@types/auto-imports.d.ts',
    'storybook-static'
  ]

  constructor(defaultConfig: Linter.Config, options?: ConfigBuilderOptions) {
    this.config = {
      ...defaultConfig,
      root: true,
      ignorePatterns: this.ignorePatterns,
      reportUnusedDisableDirectives: true,
      rules: this.buildRules(options),
      overrides: this.buildOverrides(options)
    }
  }

  /**
   * Get the final config object
   */
  public build() {
    return this.config
  }

  /**
   * Build the overrides array
   */
  private buildOverrides(
    options?: ConfigBuilderOptions,
    project = ConfigBuilder.buildTypeScriptProject()
  ): Linter.ConfigOverride<Linter.RulesRecord>[] {
    const { typescript, vue, astro } = options ?? {}
    return [
      javascriptOverrides,
      ...(typescript ? [buildTypescriptOverrides(project), dtsOverrides] : []),
      ...(vue ? [vueOverrides] : []),
      ...(astro ? [buildAstroOverrides(project)] : [])
    ]
  }

  /**
   * Build the rules object
   */
  private buildRules(options?: ConfigBuilderOptions): Linter.RulesRecord {
    const { typescript, react, reactNative, tailwind, vue } = options ?? {}
    return {
      ...javascriptRules,
      ...unusedImportsRules,
      ...simpleImportSortRules,
      ...importRules,
      ...(typescript ? typescriptRules : {}),
      ...(reactNative ? reactNativeRules : {}),
      ...(react || reactNative
        ? { ...reactRules, ...reactRefreshRules, ...this.disableA11y() }
        : {}),
      ...(tailwind ? tailwindRules : {}),
      ...(vue ? vueRules : {})
    }
  }

  /**
   * Disable all jsx-a11y rules
   */
  private disableA11y() {
    return Object.keys(rules).reduce<Record<string, any>>((acc, rule) => {
      acc[`jsx-a11y/${rule}`] = 'off'
      return acc
    }, {})
  }

  /**
   * Get the TypeScript project path
   */
  static buildTypeScriptProject(): string {
    return !fs.existsSync(join(process.cwd(), 'tsconfig.eslint.json'))
      ? resolve(process.cwd(), 'tsconfig.json')
      : resolve(process.cwd(), 'tsconfig.eslint.json')
  }
}
