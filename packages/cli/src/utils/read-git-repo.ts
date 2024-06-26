import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

export function readGitRepo() {
  const configFilePath = path.join(process.cwd(), '.git', 'config')

  const configContent = fs.readFileSync(configFilePath, 'utf-8')

  const remoteUrlMatch = configContent.match(/\[remote "origin"\][\s\S]*?url\s*=\s*(.*)/)
  if (!remoteUrlMatch) {
    throw Error('remote.origin.url not found!')
  }

  const match = remoteUrlMatch[1].match(/github\.com\/([^/]+)\/([^/]+)\.git/)

  if (!match || match.length < 3) {
    throw Error('Invalid git remote url')
  }

  const [, org, repo] = match

  return { org, repo }
}
