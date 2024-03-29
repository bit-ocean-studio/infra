import { Config } from 'prettier'

import { mergePlugins } from './merge-plugins'
import { mergeOverrides } from './merge-overrides'

export const mergeConfigs = (...configs: Config[]) =>
  configs.reduce((acc, config) => {
    return {
      ...acc,
      ...config,
      overrides: mergeOverrides(acc.overrides, config.overrides),
      plugins: mergePlugins(acc.plugins ?? [], config.plugins ?? [])
    }
  }, {})
