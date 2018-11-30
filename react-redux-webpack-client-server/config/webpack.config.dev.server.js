const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');

const config = {
  mode: 'development',
  entry: {
    main: ['webpack-hot-middleware/client?reload=true', './src/index.js']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: '/..public',
    hot: true,
    overlay: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = merge(commonConfig, config);
