import type { Resolver } from 'unplugin-auto-import/types'

import { ahooksBuiltInAPI } from './preset'

export const ahooksResolver = (): Resolver => ({
  type: 'component',
  resolve: (name: string) => {
    if (ahooksBuiltInAPI.includes(name)) {
      return {
        name,
        from: 'ahooks'
      }
    }
    return undefined
  }
})
