'use strict';

const path            = require('path');
const express         = require('express');
const webpackConfig   = require('./webpack.config.js');
const envConfig       = require('./config/env.js');
const resolve         = file => path.resolve(__dirname, file);
const isProd          = envConfig.isProd;
const port            = envConfig.port;

const app                   = express();
const webpack               = require('webpack');
const webpackDevMiddleware  = require('webpack-dev-middleware');
const webpackHotMiddleware  = require('webpack-hot-middleware');


const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
});

app.use('/client', serve('./client', true));
app.use('/dist', serve('./dist', true));
app.use('/public', serve('./public', true));
app.use('/manifest.json', serve('./manifest.json', true));
app.use('/service-worker.js', serve('./dist/service-worker.js'));

if (isProd) {
  app.get('*', function response(req, res) {
  	res.sendFile(path.join(__dirname, '/dist/index.html'));
  });
} else {
  // app.get('*', function response(req, res) {
  //   res.sendFile(path.join(__dirname, '/dist/index.html'));
  // });
  const compiler = webpack(webpackConfig);

  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('*', function response(req, res) {
    // res.render('app', { message: 'Hey there!' })
    res.sendFile(path.join(__dirname, '/dist/index.html'));
  });
}


app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }

  // const port = server.address().port;
  // console.log(`App listening on port ${port}`);
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});

module.exports = app;