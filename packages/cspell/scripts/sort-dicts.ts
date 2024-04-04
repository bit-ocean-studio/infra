import fs from 'node:fs'
import path from 'node:path'

import Bun, { $ } from 'bun'

const DICTS_DIR = 'dicts'

async function sortFile(file: string) {
  const filePath = path.join(DICTS_DIR, file)
  // Remove empty lines, sort case-insensitive, update file
  // TODO: It will throw an error when adding `await` to the beginning of the line.
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  $`grep -v '^$' ${filePath} | sort -fu -o ${filePath}`
  await Bun.write(Bun.stdout, `Dict sorted: ${file}\n`)
}

await Promise.all(
  fs
    .readdirSync(DICTS_DIR)
    .filter((file) => file.endsWith('.txt')) // Only process .txt files
    .map((file) => sortFile(file))
)
