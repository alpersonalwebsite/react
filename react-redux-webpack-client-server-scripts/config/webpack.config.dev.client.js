/*
//const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');

const config = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  devServer: {
    contentBase: '/..public',
    overlay: true
  }
};

module.exports = merge(commonConfig, config);
*/
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');

/*
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
*/

const config = {
  name: 'client',
  target: 'web',
  mode: 'development',
  entry: {
    main: ['webpack-hot-middleware/client?reload=true', './src/index.js'],
    other: './src/other.js'
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    //publicPath: '/',
    filename: './[name]-bundle.js'
  },
  devServer: {
    contentBase: '/..public',
    hot: true,
    overlay: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    /*,
    new BundleAnalyzerPlugin({
      generateStatsFile: true
    })
    */
  ]
};

module.exports = merge(commonConfig, config);
