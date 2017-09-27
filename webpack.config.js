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
const bootstrapDir = path.resolve(`${__dirname}${s}node_modules${s}bootstrap${s}dist`);
const jqueryDir = path.resolve(`${__dirname}${s}node_modules${s}jquery${s}dist`);
const popperDir = path.resolve(`${__dirname}${s}node_modules${s}popper.js${s}dist${s}umd`);

function isExternal(module) {
  var context = module.context;
  if (typeof context !== 'string') {
    return false;
  }
  return context.indexOf('node_modules') !== -1;
}
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
          test: /\.(png|jpg|gif|ico)$/,
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
                    sourceMap: true,
                    minimize: true
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: true
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true
                  }
                }
              ]
            })
        },
        {
          test: /\.(woff2?|svg)$/,
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
        files: [{
          match: [
            /\.html$/
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
    watch: true,
    devtool: 'source-map',
    devServer: {
      hot: true,
      contentBase: 'web'
    }
  }
];
