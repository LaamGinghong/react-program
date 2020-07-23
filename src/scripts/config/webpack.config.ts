import { Configuration } from 'webpack'
import { resolve } from 'path'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import WebpackBar from 'webpackbar'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import { PROJECT_DIR, PROJECT_NAME, IS_DEV } from '../constants/env'
import getCssLoaders from '../constants/get-css-loaders'
import htmlMinifierOptions from '../constants/html-minify-options'

const configuration: Configuration = {
  cache: true,
  context: resolve(PROJECT_DIR),
  entry: resolve(PROJECT_DIR, 'src', 'index.ts'),
  output: {
    path: resolve(PROJECT_DIR, 'dist'),
    filename: 'js/[name].[hash].bundle.js',
    hashSalt: PROJECT_NAME,
    publicPath: '/',
  },
  plugins: [
    new WebpackBar({ color: '#61dafb', name: PROJECT_NAME }),
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      minify: IS_DEV ? false : htmlMinifierOptions,
      title: PROJECT_NAME,
      template: resolve(PROJECT_DIR, 'src', 'index.html'),
      cache: true,
      cdn: {
        js: IS_DEV
          ? []
          : [
              'https://cdn.bootcss.com/react/16.13.1/umd/react.production.min.js',
              'https://cdn.bootcss.com/react-dom/16.13.1/umd/react-dom.production.min.js',
            ],
      },
    }),
    new HardSourceWebpackPlugin({ info: { mode: 'none', level: 'warn' } }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'thread-loader',
          { loader: 'babel-loader', options: { cacheDirectory: true } },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: getCssLoaders(0),
      },
    ],
  },
}

export default configuration
