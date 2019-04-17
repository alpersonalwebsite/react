const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const config = {
  mode: 'development',
  entry: {
    main: ['webpack-hot-middleware/client?reload=true', './src/index.js']
  },
  devServer: {
    contentBase: '/..public',
    hot: true,
    overlay: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      generateStatsFile: true
    })
  ]
};

module.exports = merge(commonConfig, config);
