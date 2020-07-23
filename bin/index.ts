#!/usr/bin/env node

// import path from 'path'
// import fs from 'fs'
import { program } from 'commander'
import process from 'process'

import { init, serve } from '../src'

program.command('init').description('初始化项目版本').action(init)

program.command('serve').description('启动本地服务').action(serve)

program.option('-h, --help', '帮助文档')

program.parse(process.argv)
