import type { PluginOption } from 'vite'

import type { PluginConfig } from './types'
import { bootstrapLog } from './utils'

export const BootstrapAnimation = (pluginConfig?: PluginConfig): PluginOption => ({
  name: 'vite-plugin-bit-ocean-bootstrap-animation',
  enforce: 'post',
  apply: 'serve',
  buildStart: () => bootstrapLog(pluginConfig),
  buildEnd: () => bootstrapLog(pluginConfig)
})
