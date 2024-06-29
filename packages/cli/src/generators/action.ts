import prompts from 'prompts'

import { Logger, readGitRepo } from '@/utils'

import { generateConfig } from './config'
import { generateContributors } from './contributors'
import { generateMonorepoLib } from './monorepo-lib'

enum ActionChoice {
  MONOREPO_LIB,
  CONFIG,
  CONTRIBUTORS
}

export const g = async () => {
  const gitRepoInfo = readGitRepo()
  const response = await prompts([
    {
      type: 'select',
      name: 'action',
      message: 'Select a generator:',
      choices: [
        {
          title: 'Monorepo Lib',
          value: ActionChoice.MONOREPO_LIB,
          description: 'Generate a monorepo lib.'
        },
        {
          title: 'Config',
          value: ActionChoice.CONFIG,
          description: 'Generate bit-ocean.config.js.'
        },
        {
          title: 'Contributors',
          value: ActionChoice.CONTRIBUTORS,
          description: 'Generate CONTRIBUTORS.md.'
        }
      ]
    },
    {
      type: (_, values) => (values.action === ActionChoice.MONOREPO_LIB ? 'text' : null),
      name: 'packageName',
      message: 'Enter the lib name:',
      initial: 'my-lib'
    },
    {
      type: (_, values) => (values.action === ActionChoice.MONOREPO_LIB ? 'text' : null),
      name: 'packageDescription',
      message: 'Enter the lib description:',
      initial: 'My lib description.'
    },
    {
      type: (_, values) => (values.action === ActionChoice.MONOREPO_LIB ? 'text' : null),
      name: 'packageOrgName',
      message: 'Enter the npm org name:',
      initial: gitRepoInfo.org,
      hint: (_, values) => `Your lib name will be: @${values.packageOrgName}/${values.packageName}`
    },
    {
      type: (_, values) => (values.action === ActionChoice.CONFIG ? 'text' : null),
      name: 'repo',
      message: 'Enter the GitHub repository name:',
      initial: gitRepoInfo.repo
    },
    {
      type: (_, values) => (values.action === ActionChoice.CONFIG ? 'text' : null),
      name: 'org',
      message: 'Enter the GitHub organization name:',
      initial: gitRepoInfo.org
    },
    {
      type: (_, values) => (values.action === ActionChoice.CONFIG ? 'text' : null),
      name: 'repo',
      message: 'Enter the GitHub repository name:',
      initial: gitRepoInfo.repo
    }
  ])

  const {
    action,
    packageName,
    packageOrgName,
    packageDescription,
    org = gitRepoInfo.org,
    repo = gitRepoInfo.repo
  } = response

  switch (action) {
    case ActionChoice.MONOREPO_LIB:
      generateMonorepoLib({
        packageName,
        packageOrgName,
        packageDescription,
        repo,
        org
      })
      break
    case ActionChoice.CONFIG:
      generateConfig({ repo, org })
      break
    case ActionChoice.CONTRIBUTORS:
      generateContributors()
      break
    default:
      Logger.error('No action selected!')
  }
}
