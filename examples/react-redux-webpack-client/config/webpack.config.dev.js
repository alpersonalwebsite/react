const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');

const config = {
  mode: 'development'
};

module.exports = merge(commonConfig, config);
