import { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'

import configuration from './webpack.config'

const prodConfiguration: Configuration = merge(
  {
    mode: 'production',
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[id].[hash].css',
        ignoreOrder: false,
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({ extractComments: false }),
        new OptimizeCssAssetsPlugin(),
      ],
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  configuration,
)

export default prodConfiguration
