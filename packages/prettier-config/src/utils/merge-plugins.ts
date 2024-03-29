import { Plugin } from 'prettier'

export const mergePlugins = (...plugins: (string | Plugin)[][]) =>
  plugins.reduce((acc, plugin) => {
    return [...acc, ...plugin]
  }, [])
