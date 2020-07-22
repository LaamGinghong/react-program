import { RuleSetUseItem } from 'webpack'
import { loader } from 'mini-css-extract-plugin'
import { IS_DEV } from './env'

function getCssLoaders(importLoaders: number, modules = false): RuleSetUseItem[] {
  return [
    IS_DEV ? 'style-loader' : loader,
    { loader: 'css-loader', options: { modules, sourceMap: true, importLoaders } },
  ]
}

export default getCssLoaders
