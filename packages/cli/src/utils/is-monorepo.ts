import fs from 'node:fs'

export function isMonorepo() {
  return fs
    .readdirSync(process.cwd())
    .some((file) => file === 'pnpm-workspace.yaml' || file === 'pnpm-workspace.yml')
}
