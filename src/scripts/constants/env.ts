import { readFileSync } from 'fs'
import { env } from 'process'

import { getRootDir } from '../../index'

const PROJECT_DIR = getRootDir()

const projectPackageJson: { [key: string]: any } = JSON.parse(
  (readFileSync(`${PROJECT_DIR}/package.json`) as any) as string,
)

const PROJECT_NAME = projectPackageJson.name

const IS_DEV = env.NODE_ENV !== 'production'

export { PROJECT_DIR, PROJECT_NAME, IS_DEV }
