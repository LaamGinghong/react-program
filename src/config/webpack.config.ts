import { Configuration } from 'webpack'
import { resolve } from 'path'
import WebpackBar from 'webpackbar'
import FriendlyErrorWebpackPlugin from 'friendly-errors-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import {
  PROJECT_NAME,
  PROJECT_ROOT,
  getCssLoaders,
  IS_DEV,
  htmlMinifyOptions,
} from '../constants'

const configuration: Configuration = {
  cache: true,
  context: resolve(PROJECT_ROOT),
  output: {
    path: resolve(PROJECT_ROOT, 'dist'),
    filename: 'js/[name].[hash].bundle.js',
    chunkFilename: 'js/[name].[hash].bundle.js',
    hashSalt: PROJECT_NAME,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: getCssLoaders(0),
      },
      {
        test: /\.scss$/,
        use: [...getCssLoaders(1), 'less-loader'],
      },
      { test: /\.less$/, use: [...getCssLoaders(1), 'sass-loader'] },
      {
        test: /\.(bmp|gif|jpe?g|png)$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: '[name].[hash].[ext]',
          outputPath: 'images',
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        loader: 'url-loader',
        options: {
          name: '[name]-[hash].[ext]',
          outputPath: 'fonts',
        },
      },
    ],
  },
  plugins: [
    new WebpackBar({ color: '#61dafb', name: PROJECT_NAME }),
    new FriendlyErrorWebpackPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      minify: IS_DEV ? false : htmlMinifyOptions,
      title: PROJECT_NAME,
      template: resolve(PROJECT_ROOT, 'src', 'index.html'),
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
}

export default configuration
