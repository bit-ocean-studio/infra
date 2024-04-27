import prompts from 'prompts'

import { Logger, readGitRepo } from '@/utils'

import { generateConfig } from './config'
import { generateContributors } from './contributors'

enum ActionChoice {
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

  const { action, org, repo } = response

  switch (action) {
    case ActionChoice.CONFIG:
      generateConfig({ repo, org })
      break
    case ActionChoice.CONTRIBUTORS:
      generateContributors()
      break
    default:
      Logger.error('No generator selected')
  }
}
