import { cwd } from 'process'
import { existsSync } from 'fs'
import { join } from 'path'

function getRootDir() {
  let rootDir = cwd()

  while (!existsSync(`${rootDir}/package.json`)) {
    rootDir = join(rootDir, '../')
  }

  return rootDir
}

export default getRootDir
