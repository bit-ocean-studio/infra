import prompts from 'prompts'

import { Logger } from '@/utils'

import { bumpBitOceanDeps } from './bit-ocean'

enum ActionChoice {
  INFRA
}

export const bump = async () => {
  const response = await prompts([
    {
      type: 'select',
      name: 'action',
      message: 'Select which to bump:',
      choices: [
        {
          title: '@bit-ocean/*',
          value: ActionChoice.INFRA,
          description: 'Bump the version of @bit-ocean/*.'
        }
      ]
    }
  ])

  const { action } = response

  switch (action) {
    case ActionChoice.INFRA:
      await bumpBitOceanDeps()
      break
    default:
      Logger.error('No action selected!')
  }
}
