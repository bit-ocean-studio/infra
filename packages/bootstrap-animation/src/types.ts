export interface PluginConfig {
  name?: string
  description?: string
  version?: string
  author?: string
  customContent?: string
  // TODO: Use enum in @bit-ocean/utils
  lang?: 'zh-CN' | 'en-US'
}
