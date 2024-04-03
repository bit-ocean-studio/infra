import Bun from 'bun'
import { $ } from 'bun'
import fs from 'node:fs'
import path from 'node:path'

const DICTS_DIR = 'dicts'

async function sortFile(file: string) {
  const filePath = path.join(DICTS_DIR, file)
  // Remove empty lines, sort case-insensitive, update file
  // TODO: It will throw an error when adding `await` to the beginning of the line.
  $`grep -v '^$' ${filePath} | sort -fu -o ${filePath}`
  await Bun.write(Bun.stdout, `Dict sorted: ${file}\n`)
}

await Promise.all(
  fs
    .readdirSync(DICTS_DIR)
    .filter((file) => file.endsWith('.txt')) // Only process .txt files
    .map((file) => sortFile(file))
)
