//const express = require('express');
import express from 'express';

//const expressStaticGzip = require('express-static-gzip');
import expressStaticGzip from 'express-static-gzip';

//const bodyParser = require('body-parser');
import bodyParser from 'body-parser';

const isProd = process.env.NODE_ENV === 'production';

//require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

const isHtmlWebpackPlugin = process.env.WEBPACK_STATIC_HTML_BUILD;

let webpackDevMiddleware, webpackHotMiddlware;

const webpack = require('webpack');

if (!isProd) {
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
} else {
  const config = require('../config/webpack.config.prod.server.js');
  webpack(config);
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
