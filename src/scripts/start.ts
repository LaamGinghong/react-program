import ora from 'ora'

import { PROJECT_DIR } from './constants/env'

function start() {
  const spin = ora()
  spin.start('启动服务中，请稍后...')

  console.log('\n' + PROJECT_DIR)
}

export default start
