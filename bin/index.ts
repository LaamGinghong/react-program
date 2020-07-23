#!/usr/bin/env ts-node

import process from 'process'
import { program } from 'commander'

import { init } from '../src'

program.command('init').description('初始化项目').action(init)

program.command('help').description('帮助文档')

program.parse(process.argv)
