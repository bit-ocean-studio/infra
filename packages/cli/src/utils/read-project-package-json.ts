import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import type { PackageJson } from 'type-fest'

import { isMonorepo } from './is-monorepo'

const DEFAULT_MONOREPO_DIRS = ['packages', 'apps']

/**
 * Read project `package.json` files, including monorepo.
 */
export function readProjectPackageJson() {
  const pathMap = new Map<string, PackageJson>()

  pathMap.set(path.resolve(process.cwd(), 'package.json'), readMonorepoRootPackageJson())

  if (isMonorepo()) {
    readMonorepoPackageJsonFiles().forEach((p) => {
      try {
        pathMap.set(p, JSON.parse(fs.readFileSync(p, 'utf-8')))
      } catch {
        //
      }
    })
  }

  return pathMap
}

function readMonorepoRootPackageJson() {
  return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8'))
}

function readMonorepoPackages(): [string, string[]][] {
  return DEFAULT_MONOREPO_DIRS.map((dir) => [dir, fs.readdirSync(path.resolve(process.cwd(), dir))])
}

function readMonorepoPackageJsonFiles() {
  const packages = readMonorepoPackages()
  return packages
    .map(([dir, packageDirs]) =>
      packageDirs.map((p) => path.resolve(process.cwd(), dir, p, 'package.json'))
    )
    .flat()
}
