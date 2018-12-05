const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');

const config = {
  entry: {
    main: ['./server/index.js']
  }
};

module.exports = merge(commonConfig, config);

console.log(4444444444444444);
