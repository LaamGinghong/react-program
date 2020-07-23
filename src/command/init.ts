import { cwd } from 'process'
import { resolve } from 'path'
import { mkdir, writeFile } from 'fs/promises'
import chalk from 'chalk'
import inquirer, { QuestionCollection } from 'inquirer'
import { textSync } from 'figlet'
import ora from 'ora'

import { copyDir, getPackageJSON } from '../utils'

interface AnswerOptions {
  projectName: string
  useTypeScript: boolean
  style: 'css' | 'less' | 'sass'
}

function isValid({ projectName, style }: Partial<AnswerOptions>): boolean {
  if (!projectName) {
    console.log(chalk.redBright('请输入项目名称'))
    return false
  }

  if (projectName.includes(' ')) {
    console.log(chalk.redBright('项目名称不允许包含空格，请修改后重试'))
    return false
  }

  if (!style) {
    console.log(chalk.redBright('请选择样式表'))
    return false
  }
  return true
}

const Question: QuestionCollection = [
  { name: 'projectName', message: '请输入项目名称', default: 'react-program' },
  {
    name: 'useTypeScript',
    message: '是否使用TypeScript?',
    type: 'confirm',
    default: true,
  },
  {
    name: 'style',
    message: '使用哪种样式表',
    choices: ['css', 'less', 'sass'],
    default: 'css',
  },
]

async function init() {
  console.log(chalk.bold.blueBright(textSync('React Program')))

  const answer = await inquirer.prompt<AnswerOptions>(Question)

  if (!isValid(answer)) return

  const { projectName, useTypeScript, style } = answer
  const projectDir = `${cwd()}/${projectName}`

  ora().start('正在依照配置生成对应模版，请稍后...')

  mkdir(projectDir)
    .then(null, () => {
      ora().fail(
        chalk.redBright(
          `当前项目名${chalk.bold(
            projectName,
          )}所对应的文件夹已经存在，请修改项目名称或删除原文件夹后重试`,
        ),
      )
    })
    .then(() => {
      const src = resolve(
        // 模版绝对路径
        __dirname,
        '../',
        'templates',
        useTypeScript ? 'typescript' : 'javascript',
        style,
      )
      copyDir(src, projectDir)
    })
    .then(() => {
      const packageJsonRoute = `${projectDir}/package.json`
      const packageJson = getPackageJSON(packageJsonRoute)
      packageJson.name = projectName
      return writeFile(packageJsonRoute, JSON.stringify(packageJson, null, 2))
    })
    .then(null, (reason) => {
      ora().fail(reason)
    })
    .then(() => {
      ora().succeed(
        `模版创建成功，开始你的撸码之旅吧 ${chalk.bgRed.bold('   o(*≧▽≦)ツ┏━┓   ')}`,
      )
      console.log(chalk.bold.yellowBright(textSync('Hello World!')))
    })
}

export default init
