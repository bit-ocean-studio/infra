import path from 'node:path'
import { pathToFileURL } from 'node:url'

import type { GlobalConfig } from '@/types'

const CONFIG_FILE_NAME = 'bit-ocean.config.js'

/**
 * Get config from `bit-ocean.config.js`
 * @description Now only support `bit-ocean.config.js` in the root directory
 */
export async function readGlobalConfig(): Promise<GlobalConfig | null> {
  try {
    const config: GlobalConfig = (
      await import(pathToFileURL(path.join(process.cwd(), CONFIG_FILE_NAME)).href)
    ).default
    return config ?? null
  } catch {
    return null
  }
}
