//require('@babel/register');

const express = require('express');

const bodyParser = require('body-parser');

const webpack = require('webpack');
const config = require('../config/webpack.config.dev.js');
const compiler = webpack(config);

const webpackDevMiddleware = require('webpack-dev-middleware')(
  compiler,
  config.devServer
);

const webpackHotMiddlware = require('webpack-hot-middleware')(
  compiler,
  config.devServer
);

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

    this.app.use(webpackDevMiddleware);
    this.app.use(webpackHotMiddlware);

    const staticMiddleware = express.static('public');
    this.app.use(staticMiddleware);
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
