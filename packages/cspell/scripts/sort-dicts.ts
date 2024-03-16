import { $ } from 'bun'
import fs from 'node:fs'
import path from 'node:path'
import { stdout } from 'node:process'

const DICTS_DIR = 'dicts'

async function sortFile(file: string) {
  const filePath = path.join(DICTS_DIR, file)
  await $`grep -v '^$' ${filePath} | sort -fu -o ${filePath}`
  stdout.write(`Dict sorted: ${file}\n`)
}

await Promise.all(
  fs
    .readdirSync(DICTS_DIR)
    .filter((file) => file.endsWith('.txt')) // Only .txt files
    .map((file) => sortFile(file))
)
