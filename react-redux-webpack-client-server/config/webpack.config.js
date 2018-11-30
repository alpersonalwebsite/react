const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

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
      /*
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
      },
      */
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
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/template.html'
    })
  ]
};
