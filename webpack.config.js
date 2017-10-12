const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
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
const jqueryDir = path.resolve(`${nodeModDir}${s}jquery${s}dist`);
const popperDir = path.resolve(`${nodeModDir}${s}popper.js${s}dist${s}umd`);

module.exports = [
  {
    entry: {
      'index': path.resolve(jsSourceDir, 'index.js'),
      vendor: [
        'react',
        'react-dom',
        'jquery',
        'popper',
        'bootstrap'
      ]
    },
    output: {
      filename: `js${s}[name].js`,
      path: targetDir
    },
    resolve: {
      alias: {
        'react': path.resolve(`${reactDir}${s}react.production.min.js`),
        'react-dom': path.resolve(`${reactDomDir}${s}react-dom.production.min.js`),
        'jquery': path.resolve(`${jqueryDir}${s}jquery.min.js`),
        'popper': path.resolve(`${popperDir}${s}popper.min.js`),
        'bootstrap': path.resolve(`${bootstrapDir}${s}js${s}bootstrap.min.js`)
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
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
                    sourceMap: false,
                    minimize: true
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: false
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: false
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
    plugins: [
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
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        /*filename: `js${s}vendors.min.js`,*/
        minChunks: Infinity
      }),
      new CopyWebpackPlugin([
        {
          from: `${bootstrapDir}${s}css${s}bootstrap.min.css`,
          to: `css${s}bootstrap.min.css`
        },
        {
          from: `src${s}css${s}sudoku.css`,
          to: `css${s}`,
          flatten: true
        },
        {
          from: `src${s}js${s}sudoku.js`,
          to: `js${s}`,
          flatten: true
        },
        {
          from: `src${s}js${s}svgDomPlayer.js`,
          to: `js${s}`,
          flatten: true
        },
        {
          from: `src${s}sudoku.html`,
          flatten: true
        },
        {
          from: `src${s}svg-dom-player.html`,
          flatten: true
        },
        {
          from: `src${s}*.pdf`,
          flatten: true
        },
        {
          from: `src${s}img${s}*.cur`,
          to: `img${s}`,
          flatten: true
        },
        {
          from: `src${s}img${s}*.png`,
          to: `img${s}`,
          flatten: true
        },
        {
          from: `src${s}img${s}*.svg`,
          to: `img${s}`,
          flatten: true
        }
      ]),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: 'popper'
      }),
      new CleanWebpackPlugin(
        [
          `web${s}*.*`,
          `web${s}css${s}*`,
          `web${s}img${s}*`,
          `web${s}js${s}*`,
          `web${s}fonts${s}*`
        ],
        {
          verbose: false,
          dry: true
        }),
      new HtmlWebpackPlugin({
        template: path.resolve(sourceDir, 'index.html'),
        filename: path.resolve(targetDir, 'index.html'),
        favicon: `src${s}img${s}favicon.ico`,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        hash: true
      }),
      new HtmlWebpackIncludeAssetsPlugin({
        assets: [
          `css${s}bootstrap.min.css`,
        ],
        append: false,
        hash: true
      }),
      new ExtractTextPlugin({
        filename: `css${s}[name].css`,
        allChunks: true
      })
    ],
    watch: false,
    /*devtool: 'source-map',*/
    devServer: {
      hot: true,
      contentBase: 'web'
    }
  }
];
