const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let pathsToClean = ['dist/', 'build/', 'public/'];

let cleanOptions = {
  root: path.resolve(__dirname, '../'),
  exclude: ['template.html', 'manifest.json', 'favicon.ico'],
  verbose: true,
  dry: false
};

const config = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css'
    })
  ]
};

module.exports = merge(baseConfig, config);
