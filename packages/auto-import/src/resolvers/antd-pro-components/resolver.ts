import type { Resolver } from 'unplugin-auto-import/types'

import { antdProComponentsBuiltInAPI } from './preset'

export const antdProComponentsResolver = (): Resolver => ({
  type: 'component',
  resolve: (name: string) => {
    if (antdProComponentsBuiltInAPI.includes(name)) {
      return {
        name,
        from: '@ant-design/pro-components'
      }
    }
    return undefined
  }
})
