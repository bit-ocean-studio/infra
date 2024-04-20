import path from 'node:path'
import { pathToFileURL } from 'node:url'

import type { GlobalConfig } from '@/types'

/**
 * Get config from `bit-ocean.config.js`
 * @description Now only support `bit-ocean.config.js` in the root directory
 */
export async function readGlobalConfig(): Promise<GlobalConfig | null> {
  try {
    const config: GlobalConfig = (
      await import(pathToFileURL(path.join(process.cwd(), 'bit-ocean.config.js')).href)
    ).default
    return config ?? null
  } catch {
    return null
  }
}
