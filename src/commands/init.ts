import { textSync } from 'figlet'
import chalk from 'chalk'
import inquirer, { QuestionCollection } from 'inquirer'

const QUESTION: QuestionCollection = [
  { name: 'projectName', message: '请输入工程名', default: 'React Program' },
  { name: 'isTypeScript', message: '是否使用TypeScript', type: 'confirm', default: true },
  {
    name: 'style',
    message: '使用哪种样式表',
    choices: ['css', 'less', 'sass'],
    default: 'css',
  },
]

function init() {
  console.log(chalk.bold.blueBright(textSync('React Program')))

  inquirer.prompt(QUESTION).then((value) => {
    console.log(value)
  })
}

export default init
