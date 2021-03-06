import { cwd } from 'process'
import chalk from 'chalk'
import ora from 'ora'

import { getRootDir } from '../utils'
import { start } from '../scripts'

function serve() {
  const rootDir = getRootDir()
  const spin = ora()

  spin.start('正在检查服务启动路径，请稍后...')

  if (rootDir !== cwd()) {
    spin.fail(
      chalk.redBright('当前服务启动路径不是项目的根目录，请切换到根目录后重新启动'),
    )
    return
  }
  spin.succeed('服务路径检查完毕，准备启动服务')

  start()
}

export default serve
