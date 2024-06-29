import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join, relative, resolve } from 'node:path'
import { cwd } from 'node:process'

import Handlebars from 'handlebars'

import { Logger } from '@/utils'

interface GenerateMonorepoLibOptions {
  packageName: string
  packageOrgName: string
  packageDescription: string
  org: string
  repo: string
}

interface PathInfo {
  type: 'dir' | 'file'
  path: string
  relativePath: string
  level: number
}

enum PathType {
  DIR = 'dir',
  FILE = 'file'
}

export const generateMonorepoLib = async (options: GenerateMonorepoLibOptions) => {
  const { packageName } = options
  const sourcePath = resolve(import.meta.dirname, '../assets/templates/monorepo-lib')
  const targetPath = resolve(cwd(), 'bit-ocean.config.js', '../packages', packageName)

  try {
    const templatePaths = await getTemplatePaths(sourcePath)

    const processTemplateFile = async (p: PathInfo) => {
      const targetWritePath = resolve(targetPath, p.relativePath)
      let byteCount: number = 0
      if (p.type === PathType.DIR) {
        await mkdir(targetWritePath)
      } else {
        const templateContent = await readFile(p.path, 'utf-8')
        const renderedContent = Handlebars.compile(templateContent)(options)
        await writeFile(targetWritePath, renderedContent)
        byteCount = Buffer.byteLength(renderedContent, 'utf-8')
      }
      Logger.success(
        `CREATED ${relative(cwd(), targetWritePath)}${byteCount ? ` (${byteCount} bytes)` : ''}`
      )
    }

    // TODO: Check if the target path already exists, and if so, ask the user if they want to overwrite it
    try {
      await rm(targetPath, { recursive: true })
    } catch {
      //
    }

    await mkdir(targetPath)

    while (templatePaths.length) {
      // eslint-disable-next-line no-await-in-loop
      await processTemplateFile(templatePaths.shift()!)
    }
  } catch (err) {
    Logger.error(err as Error)
  }
}

async function getTemplatePaths(rootPath: string) {
  const results: PathInfo[] = []

  async function traverseDirectory(currentPath: string, level = 0) {
    try {
      const entries = await readdir(currentPath, { withFileTypes: true })

      const entryPromise = entries.map(async (entry) => {
        const entryPath = join(currentPath, entry.name)
        const relativePath = relative(
          rootPath,
          entryPath.endsWith('.hbs') ? entryPath.slice(0, -4) : entryPath
        )

        if (entry.isDirectory()) {
          results.push({
            type: PathType.DIR,
            path: entryPath,
            relativePath,
            level
          })
          await traverseDirectory(entryPath, level + 1)
        } else {
          results.push({
            type: PathType.FILE,
            path: entryPath,
            relativePath,
            level
          })
        }
      })

      await Promise.all(entryPromise)
    } catch (err) {
      Logger.error(err as Error)
    }
  }

  await traverseDirectory(rootPath)
  return results.toSorted((a, b) => a.level - b.level)
}
