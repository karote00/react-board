'use strict';

const path            = require('path');
const express         = require('express');
const webpackConfig   = require('./webpack.config.js');
const envConfig       = require('./config/envConfig.js');
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
app.use('/manifest.json', serve('./manifest.json', true));

if (isProd) {
  app.get('*', (req, res) => {
  	res.sendFile(path.join(__dirname, '/dist/index.html'));
  });
} else {
  const compiler = webpack(webpackConfig);

  const middleware = webpackDevMiddleware(compiler, {
    // headers: { 'Access-Control-Allow-Origin': '*' },
    noInfo: true,
    // hot: true,
    // inline: true,
    // headers: { 'X-Custom-Header': 'yes' },
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    },
    // historyApiFallback: true
  });

  const fs = middleware.fileSystem;
  const filePath = path.join(webpackConfig.output.path, 'index.html');

  app.use(middleware);

  compiler.plugin('done', () => {
    app.get('/', (req, res, next) => {
      // if (fs.existsSync(filePath)) {
      //   const index = fs.readFileSync(filePath, 'utf-8');
      //   // res.setHeader('Content-Encoding', 'identity');
      //   // res.setHeader('Content-Type', 'application/json');
      //   // res.setHeader('Content-Type', 'text/html');
      //   // res.setHeader('Accept', 'application/json');
      //   res.send(index);
      //   // res.sendFile(filePath)
      // }
      res.sendFile(__dirname + '/client/index.html')
    });
  });

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    reload: true,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));



}


app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }

  // const port = server.address().port;
  // console.log(`App listening on port ${port}`);
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});

module.exports = app;
