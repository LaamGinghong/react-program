import { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import TerserPlugin from 'terser-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'

import configuration from './webpack.config'

const prodConf: Configuration = merge(configuration, {
  mode: 'production',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
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
      new TerserPlugin({ extractComments: false, cache: true, parallel: true }),
      new OptimizeCssAssetsPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        default: {
          chunks: 'initial',
          name: 'common',
          minChunks: 2,
          minSize: 50000,
          priority: -20,
        },
        vendors: {
          test: /[\\/]node_moduels[\\/]/,
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
        },
        style: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
          priority: 20,
        },
      },
    },
  },
})

export default prodConf
