import { readFileSync } from 'fs'

import { getRootDir } from '../../src'

const PROJECT_DIR = getRootDir()

const projectPackageJson: { [key: string]: any } = JSON.parse(
  (readFileSync(`${PROJECT_DIR}/package.json`) as any) as string,
)

const PROJECT_NAME = projectPackageJson.name

export { PROJECT_DIR, PROJECT_NAME }
