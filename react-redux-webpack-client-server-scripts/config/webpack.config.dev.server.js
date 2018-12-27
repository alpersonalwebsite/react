const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');
var nodeExternals = require('webpack-node-externals');

const config = {
  name: 'server',
  mode: 'development',
  target: 'node',
  externals: nodeExternals(),
  entry: './server/index.js',
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'server-dev-bundle.js'
  }
};

module.exports = merge(commonConfig, config);
