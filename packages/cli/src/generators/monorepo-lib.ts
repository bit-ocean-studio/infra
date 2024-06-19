import { readdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'

import { Logger } from '@/utils'

interface GenerateMonorepoLibOptions {
  name: string
  description: string
  org: string
  repo: string
}

export const generateMonorepoLib = async (options: GenerateMonorepoLibOptions) => {
  const { name } = options
  const sourcePath = resolve(import.meta.dirname, '../assets/templates/monorepo-lib')
  const targetPath = resolve(cwd(), 'bit-ocean.config.js', '../packages', name)

  try {
    const templatePaths = await readdir(sourcePath, {
      recursive: true
    })

    const processTemplateFile = async (file: string) => {
      const templateContent = await readFile(file, 'utf-8')
      const renderedContent = Handlebars.compile(templateContent)(options)
      await writeFile(resolve(targetPath, file), renderedContent)
    }

    await Promise.all(templatePaths.map(processTemplateFile))
  } catch (err) {
    Logger.error(err as Error)
  }
}
