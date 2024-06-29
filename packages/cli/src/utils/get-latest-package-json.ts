import { execSync } from 'node:child_process'

import { Logger } from './logger'

const VERSION_COMMAND = 'npm view @bit-ocean/cli@latest version'

export function getLatestVersion() {
  let version
  try {
    const stdout = execSync(VERSION_COMMAND, {
      encoding: 'utf-8'
    })
    version = stdout.toString().trim()
  } catch {
    Logger.error('Get latest version failed!')
    return null
  }
  return version
}
