import { argv, exit } from 'node:process'

import { program } from 'commander'

import { Logger, readPackageJson } from '@/utils'

import { bump } from './bump'
import { globalConfig } from './config'
import { cspell } from './cspell'
import { g } from './generators'

program
  .name(globalConfig.name!)
  .description('Universal CLI tools for Bit Ocean.')
  .version(readPackageJson().version!, '-v, --version', 'Output the current version.')
  .helpOption('-h, --help', 'Output usage information.')
  .helpCommand(false)

program
  .command('cspell')
  .summary('CSpell related scripts.')
  .description('CSpell related scripts.')
  .action(cspell)
program
  .command('engineering')
  .summary('Engineering tools.')
  .description('Engineering tools.')
  .option('-c, --check', 'Check the engineering tools.')
  .action((args) => {
    const { check } = args
    if (check) {
      Logger.info('Check the engineering tools.')
    } else {
      Logger.info('Engineering tools.')
    }
  })
program.command('g').description('Generators').action(g)
program.command('bump').description('Bump the version of the deps.').action(bump)

program.on('command:*', () => {
  Logger.error('Action not found!')
  exit(1)
})

program.parse(argv)
