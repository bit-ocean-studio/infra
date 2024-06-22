import type { Resolver } from 'unplugin-auto-import/types'

import type { AntdResolverOptions } from '@/types'
import { getComponentsMap } from '@/utils'

import { antdBuiltInAPI } from './preset'

export const antdResolver = (options: AntdResolverOptions = {}): Resolver => {
  const { prefix, packageName: from = 'antd' } = options
  const antdComponentsMap = getComponentsMap(antdBuiltInAPI, { prefix })
  return {
    type: 'component',
    resolve: (name: string) => {
      if (!prefix) {
        if (antdBuiltInAPI.includes(name)) {
          return {
            name,
            from
          }
        }
      } else {
        const originName = antdComponentsMap.get(name)
        if (originName) {
          return {
            name: originName,
            as: name,
            from
          }
        }
      }
      return undefined
    }
  }
}
