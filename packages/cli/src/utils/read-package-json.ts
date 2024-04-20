import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { PackageJson } from 'type-fest'

export function readPackageJSON(): PackageJson {
  const packageJsonPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../package.json'
  ) // NOTE: __dirname is not available in ES modules
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8')
  return JSON.parse(packageJsonContent)
}
