import { execSync } from 'node:child_process'
import fs from 'node:fs'

import { getLatestVersion, Logger, readProjectPackageJson } from '@/utils'

export const bumpBitOceanDeps = async () => {
  const latestVersion = getLatestVersion()

  if (!latestVersion) {
    Logger.error('Get version failed!')
    return
  }

  const packageJsonMap = readProjectPackageJson()

  if (packageJsonMap.size === 0) {
    Logger.error('No package.json found!')
  }

  let totalBumpCount = 0

  packageJsonMap.forEach((packageJson, path) => {
    const versionDeps: [d: string, v: string][] = []

    const updatedDependencies = packageJson.dependencies && { ...packageJson.dependencies }
    if (updatedDependencies) {
      Object.keys(packageJson.dependencies ?? {}).forEach((d) => {
        if (
          packageJson.dependencies?.[d] &&
          isBitOceanDep(d) &&
          !isWorkspaceDep(packageJson.dependencies[d]!) &&
          !isDepLatest(packageJson.dependencies[d]!, latestVersion)
        ) {
          const version = getBumpedDepVersion(packageJson.dependencies[d]!, latestVersion)
          updatedDependencies[d] = version
          versionDeps.push([d, version])
        }
      })
    }

    const updatedDevDependencies = packageJson.devDependencies && { ...packageJson.devDependencies }
    if (updatedDevDependencies) {
      Object.keys(packageJson.devDependencies ?? {}).forEach((d) => {
        if (
          packageJson.devDependencies?.[d] &&
          isBitOceanDep(d) &&
          !isWorkspaceDep(packageJson.devDependencies[d]!) &&
          !isDepLatest(packageJson.devDependencies[d]!, latestVersion)
        ) {
          const version = getBumpedDepVersion(packageJson.devDependencies[d]!, latestVersion)
          updatedDevDependencies[d] = version
          versionDeps.push([d, version])
        }
      })
    }

    const updatedPackageJson = {
      ...packageJson,
      dependencies: updatedDependencies,
      devDependencies: updatedDevDependencies
    }

    if (versionDeps.length > 0) {
      fs.writeFileSync(path, `${JSON.stringify(updatedPackageJson, null, 2)}\n`)
      versionDeps.map(([d, v]) => Logger.success(`Bumping ${d} to ${v} in ${packageJson.name}`))
      totalBumpCount += versionDeps.length
    }
  })

  if (totalBumpCount === 0) {
    Logger.success('No dependencies need to be bumped.')
  } else {
    execSync('pnpm install', { stdio: 'inherit' })
  }
}

function getBumpedDepVersion(origin: string, target: string) {
  if (isWorkspaceDep(origin)) {
    return origin
  }
  if (origin.includes('^')) {
    return `^${target}`
  }
  if (origin.includes('~')) {
    return `~${target}`
  }
  return target
}

function isBitOceanDep(dep: string) {
  return dep.startsWith('@bit-ocean/')
}

function isWorkspaceDep(version: string) {
  return version.includes('workspace:')
}

function isDepLatest(origin: string, target: string) {
  return origin.includes(target)
}
