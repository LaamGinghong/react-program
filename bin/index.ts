#!/usr/bin/env ts-node

// import path from 'path'
// import fs from 'fs'
import { program } from 'commander'

import { init, version } from '../src'

program
  .version(version, '-v, --version', '获取当前项目的版本号')
  .command('init')
  .description('初始化项目版本')
  .action(init)

program.option('-h, --help', '帮助文档')

program.parse(process.argv)
