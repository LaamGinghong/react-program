import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import chalk from 'chalk'

function copyDir(src: string, dest: string) {
  if (!existsSync(src)) {
    console.log(chalk.redBright('源目录不存在，请检查后重试'))
    return
  }

  if (!statSync(src).isDirectory()) {
    console.log(chalk.redBright('源路径不是一个文件夹'))
    return
  }

  if (!existsSync(dest)) mkdirSync(dest) // 如果目标目录不存在，那么创建一个文件夹

  const files = readdirSync(src, { withFileTypes: true })
  for (const file of files) {
    if (file.isDirectory()) {
      copyDir(`${src}/${file.name}`, `${dest}/${file.name}`)
    } else {
      copyFileSync(`${src}/${file.name}`, `${dest}/${file.name}`)
    }
  }
}

export default copyDir
