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
const clientCompiler              = webpack(webpackConfig);
const fs = clientCompiler.outputFileSystem;
const filePath = path.join(webpackConfig.output.path, 'index.html');
if (fs.existsSync(filePath)) {
  const index = fs.readFileSync(filePath, 'utf-8');
  opts.indexUpdated(index);
}

const _devMiddleware = devMiddleware(clientCompiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
});

app.use(_devMiddleware);
clientCompiler.plugin('done', (stats) => {
  const fs = clientCompiler.outputFileSystem;
  const filePath = path.join(webpackConfig.output.path, 'index.html');
  if (fs.existsSync(filePath)) {
    const index = fs.readFileSync(filePath, 'utf-8');
    opts.indexUpdated(index);
  }
});

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
});

app.use('/dist', serve('./dist', true));
// app.use('/public', serve('./public', true));
// app.use('/manifest.json', serve('./manifest.json', true));
// app.use('/service-worker.js', serve('./dist/service-worker.js'));

// app.use(middleware);
// app.use(webpackHotMiddleware(clientCompiler));

// if (isProd) {
//   app.get('*', function response(req, res) {
//   	res.sendFile(path.join(__dirname, '/dist/index.html'));
//   });
// } else {
//   app.get('*', function response(req, res) {
//     res.sendFile(path.join(__dirname, '/client/index.html'));
//   });
// }

if (isProd) {
  // in production: create server renderer and index HTML from real fs
  // renderer = createRenderer(fs.readFileSync(resolve('../dist/server-bundle.js'), 'utf-8'));
  // indexHTML = parseIndex(fs.readFileSync(resolve('../dist/index.html'), 'utf-8'));
  app.get('*', function response(req, res) {
   res.sendFile(path.join(__dirname, '/dist/index.html'));
  });
} else {
  // in development: setup the dev server with watch and hot-reload,
  // and update renderer / index HTML on file change.
  // setDevServer(app, {
  //   bundleUpdated: bundle => {
  //     renderer = createRenderer(bundle);
  //   },
  //   indexUpdated: index => {
  //     indexHTML = parseIndex(index);
  //   }
  // });

  // var current_path = process.cwd();

  // require('runkoa')(current_path + '/src/server.js' )
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