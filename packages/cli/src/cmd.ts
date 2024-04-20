import { argv, exit } from 'node:process'

import { program } from 'commander'

import { Logger, readPackageJSON } from '@/utils'

import { globalConfig } from './config'
import { generateContributors, sortDicts } from './repo-tools'

program
  .name(globalConfig.name!)
  .description('Universal CLI tools for Bit Ocean.')
  .version(readPackageJSON().version!, '-v, --version', 'Output the current version')
  .helpOption('-h, --help', 'Output usage information')
  .helpCommand(false)

program.command('cspell:sort:dicts').description('Sort CSpell dicts').action(sortDicts)
program
  .command('gen:contributors')
  .description('Generate CONTRIBUTORS.md')
  .action(generateContributors)

program.on('command:*', () => {
  Logger.error('Action not found!')
  exit(1)
})

program.parse(argv)
