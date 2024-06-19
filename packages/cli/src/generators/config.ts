import fs from 'node:fs'
import { resolve } from 'node:path'
import { cwd } from 'node:process'

import Handlebars from 'handlebars'

import type { GlobalConfig } from '@/types'
import { Logger } from '@/utils'

export const generateConfig = async (config: GlobalConfig) => {
  const sourcePath = resolve(import.meta.dirname, '../assets/engineering/bit-ocean.config.hbs')
  const targetFile = resolve(cwd(), 'bit-ocean.config.js')
  const templateContent = fs.readFileSync(sourcePath, 'utf-8')
  const renderedContent = Handlebars.compile(templateContent)(config)
  try {
    fs.writeFileSync(targetFile, renderedContent)
    Logger.success('bit-ocean.config.js has been created!')
  } catch (err) {
    Logger.error(err as Error)
  }
}
