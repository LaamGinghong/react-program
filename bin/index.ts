#!/usr/bin/env node

import process from 'process'
import { program } from 'commander'
import clear from 'clear'

import { init, serve } from '../src'

clear()

program.command('init').description('初始化项目').action(init)

program.command('serve').description('启动本地服务').action(serve)

program.command('help').description('帮助文档')

program.parse(process.argv)
