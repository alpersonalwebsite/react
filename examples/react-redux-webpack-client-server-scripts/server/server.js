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

import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

const isHtmlWebpackPlugin = process.env.WEBPACK_STATIC_HTML_BUILD;

let webpackDevMiddleware, webpackHotMiddlware, compiler;

const webpack = require('webpack');
import devClientConfiguration from '../config/webpack.config.dev.client.js';
import devServerConfiguration from '../config/webpack.config.dev.server.js';

import prodClientConfiguration from '../config/webpack.config.prod.client.js';
import prodServerConfiguration from '../config/webpack.config.prod.server.js';

console.log('ENNNNNNNNNNNNNNNNNNNNNNNNNNN', typeof isProd);

if (isProd === false) {
  //const config = require('../config/webpack.config.dev.server.js');
  //const devClientConfiguration = require('../config/webpack.config.dev.client.js');
  //const devServerConfiguration = require('../config/webpack.config.dev.server.js');

  compiler = webpack([devClientConfiguration, devServerConfiguration]);

  //console.log(compiler);

  webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    devClientConfiguration.devServer
  );

  webpackHotMiddlware = require('webpack-hot-middleware')(
    compiler.compilers[0],
    devClientConfiguration.devServer
  );
} else {
  console.log('WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW');
  //const config = require();
  webpack([prodClientConfiguration, prodServerConfiguration]);
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
      console.log(1111111111111111111111, webpackDevMiddleware);
      this.app.use(webpackDevMiddleware);
      this.app.use(webpackHotMiddlware);
      this.app.use(webpackHotServerMiddleware(compiler));
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

/*
module.exports = app => {
  return new RouterAndMiddlewares(app);
};
*/
