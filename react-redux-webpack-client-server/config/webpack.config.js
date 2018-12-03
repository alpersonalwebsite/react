const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';
console.log(isProd);

const cssForDev = [
  { loader: 'style-loader' },
  {
    loader: 'css-loader',
    query: {
      modules: true,
      localIdentName: '[name]__[local]__[hash:base64:5]'
    }
  }
];

const cssForProd = [MiniCssExtractPlugin.loader, 'css-loader'];

//// Here´s the config

module.exports = {
  entry: {
    main: './src/index.js',
    other: './src/other.js'
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    //  publicPath: '/',
    filename: './[name]-bundle.js'
  },
  stats: {
    colors: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: isProd ? cssForProd : cssForDev
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  /*
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
  */
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/template.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

console.log('Environment', process.env.NODE_ENV);
