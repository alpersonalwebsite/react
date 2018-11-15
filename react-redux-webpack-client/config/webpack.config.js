const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //  entry: './src/index.js',
  /*
  stats: {
    colors: true
  },
  */
  entry: {
    main: './src/index.js',
    other: './src/other.js'
  },
  //mode: 'development',
  output: {
    path: path.resolve(__dirname, '../public'),
    //publicPath: '/',
    filename: './[name]bundle.js'
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
      }
    ]
  },
  devServer: {
    contentBase: 'public'
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/template.html'
    })
  ]
};
