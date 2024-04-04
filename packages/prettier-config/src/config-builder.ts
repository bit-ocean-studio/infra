import type { Config, Options, Plugin } from 'prettier'

import { astroPresets, basePresets, tailwindPresets } from './presets'
import type { ConfigBuilderOptions } from './types'

export class ConfigBuilder {
  /**
   * Prettier config object
   */
  private readonly config: Options

  constructor(options: ConfigBuilderOptions) {
    this.config = this.mergeConfigs(
      basePresets,
      options.tailwind ? tailwindPresets : {},
      options.astro ? astroPresets : {}
    )
  }

  /**
   * Get the final config object
   */
  public build() {
    return this.config
  }

  private mergeConfigs(...configs: Config[]) {
    return configs.reduce(
      (acc, config) => ({
        ...acc,
        ...config,
        overrides: this.mergeOverrides(acc.overrides, config.overrides),
        plugins: this.mergePlugins(acc.plugins ?? [], config.plugins ?? [])
      }),
      {}
    )
  }

  /**
   * Merge prettier overrides
   */
  private mergeOverrides(...overrides: Config['overrides'][]) {
    return overrides.reduce((acc, override) => [...(acc ?? []), ...(override ?? [])], [])
  }

  /**
   * Merge prettier plugins
   */
  private mergePlugins(...plugins: (string | Plugin)[][]) {
    return plugins.reduce((acc, plugin) => [...acc, ...plugin], [])
  }
}
