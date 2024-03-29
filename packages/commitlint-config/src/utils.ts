import fs from 'node:fs'
import path from 'node:path'

/**
 * Check if the project is a monorepo
 * @description NOTE: Now only support pnpm workspace.
 */
export function isMonorepo(): boolean {
  return fs.existsSync('pnpm-workspace.yaml') || fs.existsSync('pnpm-workspace.yml')
}

export function getPackages(dirName: string): string[] {
  if (!isMonorepo()) {
    return []
  }
  const packagesDir = path.resolve(process.cwd(), dirName)
  if (!fs.existsSync(packagesDir)) {
    return []
  }
  return fs.readdirSync(packagesDir)
}
