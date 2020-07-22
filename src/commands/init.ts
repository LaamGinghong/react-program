import { textSync } from 'figlet'
import chalk from 'chalk'
import inquirer, { QuestionCollection } from 'inquirer'
import ora from 'ora'
import { mkdir, writeFile } from 'fs/promises'
import { resolve } from 'path'
import { cwd } from 'process'

import { getPackageJSON, copyDir } from '../utils'

const QUESTION: QuestionCollection = [
  {
    name: 'projectName',
    message: '请输入工程名',
    default: 'react-program',
  },
  { name: 'isTypeScript', message: '是否使用TypeScript', type: 'confirm', default: true },
  {
    name: 'style',
    message: '使用哪种样式表',
    choices: ['css', 'less', 'sass'],
    default: 'css',
  },
]

interface AnswerMap {
  projectName: string
  isTypeScript: boolean
  style: 'css' | 'less' | 'sass'
}

function validate({ projectName, style }: AnswerMap): boolean {
  if (!projectName) {
    console.log(chalk.redBright('请输入工程名'))
    return false
  }

  if (projectName.includes(' ')) {
    console.log(chalk.redBright('工程名称不允许包含空格，请修改后重试'))
    return false
  }

  if (!style) {
    console.log(chalk.redBright('请选择样式表'))
    return false
  }
  return true
}

async function init() {
  console.log(chalk.bold.blueBright(textSync('React Program')))

  const answer = await inquirer.prompt<AnswerMap>(QUESTION)
  if (!validate(answer)) {
    return
  }

  const spin = ora()
  spin.start('正在依照配置生成对应模版，请稍后...')

  const { projectName, isTypeScript, style } = answer
  const projectDir = `${cwd()}/${projectName}`

  mkdir(projectDir)
    .then(null, () => {
      spin.fail(
        chalk.redBright(
          `当前项目名 ${chalk.bold(
            projectName,
          )} 所对应的文件夹已经存在，请修改项目名或删除原文件夹后重试`,
        ),
      )
    })
    .then(() => {
      const src = resolve(
        __dirname,
        '../',
        'templates',
        isTypeScript ? 'typescript' : 'javascript',
        style,
      )
      copyDir(src, projectDir)
    })
    .then(() => {
      const packageJSON = getPackageJSON(projectDir)
      packageJSON.name = projectName
      return writeFile(`${projectDir}/package.json`, JSON.stringify(packageJSON, null, 2))
    })
    .then(null, (reason) => {
      spin.fail(reason)
    })
    .then(() => {
      spin.succeed(
        `模版创建成功，开始你的撸码之旅吧 ${chalk.bgRed.bold('   o(*≧▽≦)ツ┏━┓   ')}`,
      )
      console.log(chalk.bold.yellowBright(textSync('Hello World!')))
    })
}

export default init
