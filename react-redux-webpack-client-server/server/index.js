//require('@babel/register');

const express = require('express');
const expressStaticGzip = require('express-static-gzip');

const bodyParser = require('body-parser');

const isProd = process.env.NODE_ENV === 'production';

require('dotenv').config();
const isHtmlWebpackPlugin = process.env.WEBPACK_STATIC_HTML_BUILD;
console.log(isHtmlWebpackPlugin);

let webpackDevMiddleware, webpackHotMiddlware;

if (!isProd) {
  const webpack = require('webpack');
  const config = require('../config/webpack.config.dev.server.js');
  const compiler = webpack(config);

  webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    config.devServer
  );

  webpackHotMiddlware = require('webpack-hot-middleware')(
    compiler,
    config.devServer
  );
}

class RouterAndMiddlewares {
  constructor() {
    this.app = express();
    this.initExpress();
    this.middlewaresExpress();
    this.initControllers();
    this.start();
  }

  initExpress() {
    this.app.set('port', 8080);
  }

  middlewaresExpress() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    if (!isProd) {
      this.app.use(webpackDevMiddleware);
      this.app.use(webpackHotMiddlware);
    }

    /*
    const staticMiddleware = express.static('public');
    this.app.use(staticMiddleware);
    */

    this.app.use(
      expressStaticGzip('public', {
        enableBrotli: true,
        prefere: ['br']
      })
    );
  }

  initControllers() {
    require('./BasicController.js')(this.app);
  }
  start() {
    let self = this;
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server Listening for port: ${self.app.get('port')}`);
    });
  }
}

new RouterAndMiddlewares();
