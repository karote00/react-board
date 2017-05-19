'use strict';

const path = require('path');
const express = require('express');
const config = require('./config/webpack.config.js');
const resolve = file => path.resolve(__dirname, file);
const isProd = process.env.NODE_ENV === 'production';

const port = 5772;
const app = express();

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  // contentBase: 'dist',
  // stats: {
  //   colors: true,
  //   hash: false,
  //   timings: true,
  //   chunks: true,
  //   chunkModules: false,
  //   modules: false
  // }
});

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
});

app.use('/dist', serve('./dist', true));
app.use('/public', serve('./public', true));
app.use('/manifest.json', serve('./manifest.json', true));
app.use('/service-worker.js', serve('./dist/service-worker.js'));

app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.get('*', function response(req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(port, 'localhost', function onStart(err) {
  if (err) {
    console.log(err);
  }

  // const port = server.address().port;
  // console.log(`App listening on port ${port}`);
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});

module.exports = app;