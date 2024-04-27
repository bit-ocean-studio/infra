import fs from 'node:fs'
import path from 'node:path'

import { Logger } from '@/utils'

const DICTS_DIR = 'packages/cspell/dicts'

async function sortFile(filePath: string) {
  try {
    const words = fs
      .readFileSync(filePath, 'utf-8')
      .split('\n')
      .filter((value, index, array) => value && array.indexOf(value) === index)
      .sort((a, b) => a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase()))
    fs.writeFileSync(filePath, words.join('\n'))
    Logger.success(`Sorted ${filePath}`)
  } catch (e) {
    Logger.error(`Error sorting ${filePath}: ${(e as Error).message}`)
  }
}

export async function sortDicts() {
  // Sort `.cspell.txt`
  if (fs.existsSync('.cspell.txt')) {
    await sortFile('.cspell.txt')
  }
  // Sort all files in `packages/cspell/dicts`
  await Promise.all(
    fs
      .readdirSync(DICTS_DIR)
      .filter((file) => file.endsWith('.txt')) // Only process .txt files
      .map((file) => sortFile(path.join(DICTS_DIR, file)))
  )
}
