import fs from 'node:fs'
import path from 'node:path'
import { stdout } from 'node:process'

const DICTS_DIR = 'dicts'

async function sortFile(file: string) {
  try {
    const filePath = path.join(DICTS_DIR, file)
    const words = fs
      .readFileSync(filePath, 'utf-8')
      .split('\n')
      .filter((value, index, array) => value && array.indexOf(value) === index)
      .sort()
    fs.writeFileSync(filePath, words.join('\n'))
    stdout.write(`Sorted ${file}\n`)
  } catch (e) {
    stdout.write(`Error sorting ${file}: ${(e as Error).message}\n`)
  }
}

await Promise.all(
  fs
    .readdirSync(DICTS_DIR)
    .filter((file) => file.endsWith('.txt')) // Only process .txt files
    .map((file) => sortFile(file))
)
