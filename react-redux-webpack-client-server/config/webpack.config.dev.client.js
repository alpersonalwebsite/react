//const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');

const config = {
  mode: 'development',
  entry: {
    main: ['./src/index.js']
  },
  devServer: {
    contentBase: '/..public',
    overlay: true
  }
};

module.exports = merge(commonConfig, config);
