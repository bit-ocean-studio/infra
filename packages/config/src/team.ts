export interface TeamConfig {
  /**
   * The name of the team.
   */
  teamName: string
  /**
   * The URL of the team's GitHub organization.
   */
  githubURL: string
}

export const teamConfig: Readonly<TeamConfig> = Object.freeze<TeamConfig>({
  teamName: 'Bit Ocean',
  githubURL: 'https://github.com/bit-ocean-studio'
})
