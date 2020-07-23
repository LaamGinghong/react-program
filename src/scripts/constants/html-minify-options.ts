import { Options } from 'html-minifier'

const htmlMinifierOptions: Options = {
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  collapseInlineTagWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  minifyCSS: true,
  minifyURLs: true,
  minifyJS: true,
  useShortDoctype: true,
}

export default htmlMinifierOptions
