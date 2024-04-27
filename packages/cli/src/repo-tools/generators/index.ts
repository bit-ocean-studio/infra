import prompts from 'prompts'

import { readGitRepo } from '@/utils'

import { generateConfig } from './config'
import { generateContributors } from './contributors'

enum GeneratorChoice {
  CONFIG,
  CONTRIBUTORS
}

const generatorChoices: prompts.Choice[] = [
  { title: 'Config', value: GeneratorChoice.CONFIG, description: 'Generate bit-ocean.config.js' },
  {
    title: 'Contributors',
    value: GeneratorChoice.CONTRIBUTORS,
    description: 'Generate CONTRIBUTORS.md'
  }
]

export const g = async () => {
  const gitRepoInfo = readGitRepo()
  const response = await prompts([
    {
      type: 'select',
      name: 'action',
      message: 'Select a generator?',
      choices: generatorChoices
    },
    {
      type: (_, values) => (values.action === GeneratorChoice.CONFIG ? 'text' : null),
      name: 'org',
      message: 'Enter the GitHub organization name:',
      initial: gitRepoInfo.org
    },
    {
      type: (_, values) => (values.action === GeneratorChoice.CONFIG ? 'text' : null),
      name: 'repo',
      message: 'Enter the GitHub repository name:',
      initial: gitRepoInfo.repo
    }
  ])

  const { action, org, repo } = response

  switch (action) {
    case GeneratorChoice.CONFIG:
      generateConfig({ repo, org })
      break
    case GeneratorChoice.CONTRIBUTORS:
      generateContributors()
      break
    default:
      console.log('No generator selected')
  }
}
