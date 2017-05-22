const webpack             = require('webpack');
const path                = require('path');
const ExtractTextPlugin   = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin   = require('html-webpack-plugin');
const SWPrecachePlugin    = require('sw-precache-webpack-plugin');
const extractCSS          = new ExtractTextPlugin('stylesheets/[name].css');
const envConfig           = require('./config/env.js');
const hotMiddlewareScript = 'webpack-hot-middleware/client';
const hotMiddlewareScript2 = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const hotMiddlewareScript3 = 'webpack-hot-middleware/client?path=http://localhost:5772';
const publicPath = path.resolve(__dirname, './dist');

const config = {
  context: __dirname,
  entry: {
    app: [
      hotMiddlewareScript,
      './client/app.js'
    ],
  },
  devtool: 'eval',
  // target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    publicPath: path.resolve(__dirname, '/client'),
    path: '/client'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.[hash].css',
      allChunks: true
    }),
    new HTMLWebpackPlugin(),
    // new HTMLWebpackPlugin({
    //   template: 'client/index.html'
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.output.publicPath = './';

  config.plugins.push(
    // minify JS
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'vue-hn',
      filename: 'service-worker.js',
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
    })
  )
}

module.exports = config;
