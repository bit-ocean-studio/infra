import prompts from 'prompts'

import { Logger } from '@/utils'

import { sortDicts } from './sort-dicts'

enum ActionChoice {
  SORT_DICTS
}

export const cspell = async () => {
  const response = await prompts({
    type: 'select',
    name: 'action',
    message: 'Select an action:',
    choices: [
      {
        title: 'Sort dicts',
        value: ActionChoice.SORT_DICTS,
        description: 'Sort CSpell dictionaries alphabetically.'
      }
    ]
  })

  const { action } = response

  switch (action) {
    case ActionChoice.SORT_DICTS:
      sortDicts()
      break
    default:
      Logger.error('No action selected!')
  }
}
