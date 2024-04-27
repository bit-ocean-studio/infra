import { argv, exit } from 'node:process'

import { program } from 'commander'

import { Logger, readPackageJSON } from '@/utils'

import { globalConfig } from './config'
import { g, sortDicts } from './repo-tools'

program
  .name(globalConfig.name!)
  .description('Universal CLI tools for Bit Ocean.')
  .version(readPackageJSON().version!, '-v, --version', 'Output the current version')
  .helpOption('-h, --help', 'Output usage information')
  .helpCommand(false)

program.command('cspell:sort:dicts').description('Sort CSpell dicts').action(sortDicts)
program.command('g').description('Generators').action(g)
program.on('command:*', () => {
  Logger.error('Action not found!')
  exit(1)
})

program.parse(argv)
