const webpack             = require('webpack');
const path                = require('path');
const ExtractTextPlugin   = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin   = require('html-webpack-plugin');
const HtmlPluginRemove    = require('html-webpack-plugin-remove');
const CleanWebpackPlugin  = require('clean-webpack-plugin');
const SWPrecachePlugin    = require('sw-precache-webpack-plugin');
const extractCSS          = new ExtractTextPlugin('stylesheets/[name].css');
const hotMiddlewareScript = 'webpack-hot-middleware/client';
const envConfig           = require('./config/envConfig.js');
const isProd              = envConfig.isProd;
const devtool             = isProd? 'source-map': 'cheap-module-eval-source-map';
const bundlePath          = './dist';
const publicPath          = path.resolve(__dirname, bundlePath);

const pathsToClean = ['dist'];
let cleanOptions = {
  root:     '/',
  // exclude:  ['shared.js'],
  verbose:  true,
  // dry:      false
};

let envToBeInjected = {
  status: isProd? "production": "dev"
};

const config = {
  context: __dirname,
  entry: {
    app: [
      hotMiddlewareScript,
      './client/app.js'
    ],
  },
  devtool: devtool,
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
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
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
    new webpack.DefinePlugin({
      ENV: JSON.stringify(envToBeInjected)
    }),
    new ExtractTextPlugin({
      filename: 'styles.[hash].css',
      allChunks: true
    }),
    // new HTMLWebpackPlugin(),
    // new HtmlPluginRemove(/<script.*?src="\/client\..*?\.js".*?<\/script>/),
    new HtmlPluginRemove(/<script.*?src="\/client\/bundle.js".*?<\/script>/),
    new HTMLWebpackPlugin({
      template: 'client/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(pathsToClean, cleanOptions)
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.output.publicPath = '/dist';
  config.output.filename = '[name].[hash].js'
  config.output.path = publicPath;

  config.plugins.push(
    // minify JS
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
    // }),
    // auto generate service worker
    // new SWPrecachePlugin({
    //   cacheId: 'vue-hn',
    //   filename: 'service-worker.js',
    //   dontCacheBustUrlsMatching: /./,
    //   staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
    // })
  )
}

module.exports = config;
