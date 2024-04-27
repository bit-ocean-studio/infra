import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import Handlebars from 'handlebars'

import type { GlobalConfig } from '@/types'
import { Logger } from '@/utils'

export const generateConfig = async (data: GlobalConfig) => {
  const sourceDir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../assets/engineering/bit-ocean.config.hbs'
  )
  const targetDir = path.resolve(process.cwd(), 'bit-ocean.config.js')

  const templateContent = fs.readFileSync(sourceDir, 'utf-8')

  const renderedContent = Handlebars.compile(templateContent)(data)

  try {
    fs.writeFileSync(targetDir, renderedContent)
    Logger.success('bit-ocean.config.js has been created!')
  } catch (err) {
    Logger.error(`${err}`)
  }
}
