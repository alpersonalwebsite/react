const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');

const config = {
  mode: 'development',
  devServer: {
    contentBase: '/..public',
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = merge(commonConfig, config);
