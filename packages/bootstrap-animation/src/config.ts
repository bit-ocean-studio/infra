import { teamConfig } from '@bit-ocean/config'

// TODO: Use package.json version.
const version = '0.0.1'

const { TEAM_NAME, GITHUB_URL, TEAM_FOUNDER } = teamConfig

export const metadata = Object.freeze({
  'zh-CN': {
    name: TEAM_NAME,
    description: '',
    version,
    author: TEAM_FOUNDER,
    customContent: `由 ${TEAM_NAME} 提供技术支持 - ${GITHUB_URL}`
  },
  'en-US': {
    name: TEAM_NAME,
    description: '',
    version,
    author: TEAM_FOUNDER,
    customContent: `Powered by ${TEAM_NAME} - ${GITHUB_URL}`
  }
})

export const i18n = Object.freeze({
  'zh-CN': {
    author: '作者：',
    version: '版本：'
  },
  'en-US': {
    author: 'Author: ',
    version: 'Version: '
  }
})
