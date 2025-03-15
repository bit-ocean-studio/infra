import { stdout } from 'node:process'

import figlet from 'figlet'
import { pastel, rainbow } from 'gradient-string'

import { i18n, metadata } from './config'
import type { PluginConfig } from './types'

export const bootstrapLog = (pluginConfig?: PluginConfig) => {
  const { name, description, author, version, customContent, lang = 'en-US' } = pluginConfig ?? {}

  const config = metadata[lang]
  figlet(name ?? config.name, (err, data = '') => {
    if (err) {
      return
    }
    stdout.write(`\n${rainbow(data)}\n`)
    process.stdout.write(
      `\n${pastel(
        `> ${i18n[lang].author}${author ?? config.author} | ${i18n[lang].version}${
          version ?? config.version
        }`
      )}`
    )
    stdout.write(`\n${pastel(`> ${description ?? config.description}`)}`)
    stdout.write(`\n${pastel(`> ${customContent ?? config.customContent}`)}\n`)
  })
}
