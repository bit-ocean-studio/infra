import { teamConfig } from '@bit-ocean/config'

import type { GlobalConfig } from './types'

export const globalConfig = Object.freeze<GlobalConfig>({
  name: `${teamConfig.TEAM_NAME} CLI`
})
