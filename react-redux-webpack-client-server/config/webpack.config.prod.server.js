const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');
var nodeExternals = require('webpack-node-externals');

const config = {
  mode: 'production',
  target: 'node',
  externals: nodeExternals(),
  entry: {
    server: ['./server/index.js']
  }
};

module.exports = merge(commonConfig, config);
