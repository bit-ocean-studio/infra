import { bgBlue, lightGreen, lightRed } from 'kolorist'

import { globalConfig } from '@/config'

export class Logger {
  static info(message: string) {
    process.stdout.write(`${bgBlue(` ${globalConfig.name} `)} ${message}\n`)
  }

  static success(message: string) {
    process.stdout.write(`${bgBlue(` ${globalConfig.name} `)} ${lightGreen(message)}\n`)
  }

  static error(message: string) {
    process.stdout.write(`${bgBlue(` ${globalConfig.name} `)} ${lightRed(message)}\n`)
  }
}
