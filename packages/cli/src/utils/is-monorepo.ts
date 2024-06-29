import fs from 'node:fs'

export function isMonorepo() {
  return fs.readdirSync(process.cwd()).some((file) => file.includes('pnpm-workspace'))
}
