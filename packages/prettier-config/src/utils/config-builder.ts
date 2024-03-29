import { Options } from 'prettier'

import { basePresets, tailwindPresets, astroPresets } from './presets'
import { mergePlugins } from './merge-plugins'
import { mergeConfigs } from './merge-configs'

interface ConfigBuilderOptions {
  tailwind?: boolean
  astro?: boolean
}

export class ConfigBuilder {
  /**
   * Prettier config object
   */
  config: Options

  constructor(options: ConfigBuilderOptions) {
    this.config = mergeConfigs(
      basePresets,
      options.tailwind ? tailwindPresets : {},
      options.astro ? astroPresets : {}
    )
  }

  /**
   * Get the final config object
   */
  build() {
    return this.config
  }
}
