import { env, cwd } from 'process'

import { getPackageJSON } from '../utils'

const PROJECT_ROOT = cwd() // todo
const IS_DEV = env.NODE_ENV !== 'production'

const packageJson = getPackageJSON(`${PROJECT_ROOT}/package.json`)
const PROJECT_NAME = packageJson.name

export { PROJECT_ROOT, IS_DEV, PROJECT_NAME }
