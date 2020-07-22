import { Configuration, HotModuleReplacementPlugin } from 'webpack'
import { merge } from 'webpack-merge'

import configuration from './webpack.config'

const devConfiguration: Configuration = merge(
  {
    mode: 'development',
    module: {
      rules: [{ test: /\.js$/, enforce: 'pre', loader: 'source-map-loader' }],
    },
    devtool: 'source-map',
    plugins: [new HotModuleReplacementPlugin()],
  },
  configuration,
)

export default devConfiguration
