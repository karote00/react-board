const webpack             = require('webpack');
const path                = require('path');
const ExtractTextPlugin   = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin   = require('html-webpack-plugin');
const SWPrecachePlugin    = require('sw-precache-webpack-plugin');
const extractCSS          = new ExtractTextPlugin('stylesheets/[name].css');
const hotMiddlewareScript = 'webpack-hot-middleware/client';
const publicPath          = path.resolve(__dirname, './dist');
const envConfig           = require('./config/env.js');
const isProd              = envConfig.isProd;
const bundlePath          = isProd? '/dist': '/client';

const config = {
  context: __dirname,
  entry: {
    app: [
      hotMiddlewareScript,
      './client/app.js'
    ],
  },
  devtool: isProd? 'source-map': 'eval',
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
    publicPath: path.resolve(__dirname, bundlePath),
    path: bundlePath
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
