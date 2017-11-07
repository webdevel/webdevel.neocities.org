const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack');
const path = require('path');
const s = path.sep;
const targetDir = path.resolve(__dirname, 'web');
const sourceDir = path.resolve(__dirname, 'src');
const jsSourceDir = path.resolve(sourceDir,'js');
const nodeModDir = path.resolve(`${__dirname}${s}node_modules`);
const reactDir = path.resolve(`${nodeModDir}${s}react${s}umd`);
const reactDomDir = path.resolve(`${nodeModDir}${s}react-dom${s}umd`);
const bootstrapDir = path.resolve(`${nodeModDir}${s}bootstrap${s}dist`);
const carouselDir = path.resolve(`${nodeModDir}${s}react-responsive-carousel${s}lib`);
const jqueryDir = path.resolve(`${nodeModDir}${s}jquery${s}dist`);
const popperDir = path.resolve(`${nodeModDir}${s}popper.js${s}dist${s}umd`);
const youtubeSearchDir = path.resolve(`${nodeModDir}${s}youtube-search-google-api${s}dist`);

module.exports = env => {

  // initialize for development environment
  let webpackWatch = true
  let sourceMap = 'inline-source-map'
  let output = {
    filename: '[name].js'
  }
  let css = {
    filename: '[name].css',
    enableSourceMap: true,
    enableMinify: false
  }
  let htmlMinify = {
    removeComments: true,
    collapseWhitespace: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true
  }

  // initialize common plugins used in development and production
  let plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new CopyWebpackPlugin([
      {from: `${bootstrapDir}${s}css${s}bootstrap.min.css`, to: `css${s}bootstrap.min.css`},
      {from: `${carouselDir}${s}styles${s}carousel.min.css`, to: `css${s}carousel.min.css`},
      {from: `src${s}css${s}sudoku.css`, to: `css${s}`, flatten: true},
      {from: `src${s}js${s}sudoku.js`, to: `js${s}`, flatten: true},
      {from: `src${s}js${s}svgDomPlayer.js`, to: `js${s}`, flatten: true},
      {from: `src${s}sudoku.html`, flatten: true},
      {from: `src${s}svg-dom-player.html`, flatten: true},
      {from: `src${s}*.pdf`, flatten: true},
      {from: `src${s}img${s}*.cur`, to: `img${s}`, flatten: true},
      {from: `src${s}img${s}*.png`, to: `img${s}`, flatten: true},
      {from: `src${s}img${s}*.svg`, to: `img${s}`, flatten: true}
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: 'popper'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(sourceDir, 'index.html'),
      filename: path.resolve(targetDir, 'index.html'),
      favicon: `src${s}img${s}favicon.ico`,
      minify: htmlMinify,
      hash: true,
      chunks: [
        'vendor',
        'index'
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(sourceDir, 'index.html'),
      filename: path.resolve(targetDir, 'video.html'),
      favicon: `src${s}img${s}favicon.ico`,
      minify: htmlMinify,
      hash: true,
      chunks: [
        'vendor',
        'video'
      ]
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        `css${s}bootstrap.min.css`
      ],
      append: false,
      hash: true,
      files: ['index.html', 'video.html']
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        `css${s}carousel.min.css`
      ],
      append: false,
      hash: true,
      files: ['video.html']
    }),
    new ExtractTextPlugin({
      filename: `css${s}${css.filename}`,
      allChunks: true
    })
  ]

  if (env.production) {

    css.enableMinify = true
    css.enableSourceMap = false
    webpackWatch = false
    sourceMap = 'source-map'
    output.filename = '[name].min.js'
    plugins.push(
      new UglifyJSPlugin({
        test: /\.(js|jsx)$/,
        include: /src\/js/,
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          ecma: 6,
          warnings: false
        }
      })
    )
  } else { /* env.development */
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    )
  }
  return  {
    entry: {
      'index': path.resolve(jsSourceDir, 'index.js'),
      'video': path.resolve(jsSourceDir, 'video.js'),
      vendor: [
        'react',
        'react-dom',
        'jquery',
        'popper',
        'bootstrap'
      ]
    },
    output: {
      filename: `js${s}${output.filename}`,
      path: targetDir
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        'youtube-search-google-api': path.resolve(youtubeSearchDir, 'youtube-search.min.js'),
        'react': path.resolve(reactDir, 'react.production.min.js'),
        'react-dom': path.resolve(reactDomDir, 'react-dom.production.min.js'),
        'jquery': path.resolve(jqueryDir, 'jquery.min.js'),
        'popper': path.resolve(popperDir, 'popper.min.js'),
        'bootstrap': path.resolve(`${bootstrapDir}${s}js${s}bootstrap.min.js`)
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: /src\/js/,
          loader: 'babel-loader'
        },
        {
          test: /\.(png|jpg|gif|ico|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: `img${s}`,
                publicPath: 'img'
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use:
            ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: css.enableSourceMap,
                    minimize: css.enableMinify
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: css.enableSourceMap
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: css.enableSourceMap
                  }
                }
              ]
            })
        },
        {
          test: /\.(woff2?|svg)$/,
          include: [
            'fonts'
          ],
          loader: `url-loader?limit=10000&name=fonts${s}[name].[ext]`
        },
        {
          test: /\.(ttf|eot)$/,
          loader: `file-loader?name=fonts${s}[name].[ext]`
        }
      ]
    },
    plugins: plugins,
      /*new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080',
        online: true,
        files: [{
          match: [
            '*.html'
          ],
          fn: function(event, file) {
            if (event === 'change') {
              const bs = require('browser-sync').get('bs-webpack-plugin');
              bs.reload();
            }
          }
        }]
      }, { reload: false }),*/
    watch: webpackWatch,
    /*devtool: sourceMap,*/
    /*devServer: {
      hot: true,
      contentBase: 'web'
    }*/
  }
}
