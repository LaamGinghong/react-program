import { copyFileSync, existsSync, statSync, mkdirSync, readdirSync } from 'fs'
import chalk from 'chalk'

function copyDir(src: string, dist: string) {
  if (!existsSync(src)) {
    console.log(chalk.redBright('等待复制的路径不存在'))
    return
  }

  if (!statSync(src).isDirectory()) {
    console.log(chalk.redBright('等待复制的路径不是一个文件夹'))
    return
  }

  if (!existsSync(dist)) mkdirSync(dist)

  const files = readdirSync(src, { withFileTypes: true })
  for (const file of files) {
    if (file.isDirectory()) {
      copyDir(`${src}/${file.name}`, `${dist}/${file.name}`)
    } else {
      copyFileSync(`${src}/${file.name}`, `${dist}/${file.name}`)
    }
  }
}

export default copyDir
