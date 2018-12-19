const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');
var nodeExternals = require('webpack-node-externals');

const config = {
  mode: 'development',
  target: 'node',
  externals: nodeExternals(),
  entry: {
    main: './server/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: './server-dev-bundle.js'
  }
};

module.exports = merge(commonConfig, config);
