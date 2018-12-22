const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');
var nodeExternals = require('webpack-node-externals');

const config = {
  mode: 'production',
  target: 'node',
  externals: nodeExternals(),
  entry: './server/index.js',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: './server-prod-bundle.js'
  }
};

module.exports = merge(commonConfig, config);
