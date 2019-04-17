const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

let pathsToClean = ['dist/', 'build/', 'public/'];

let cleanOptions = {
  root: path.resolve(__dirname, '../'),
  exclude: ['template.html', 'manifest.json', 'favicon.ico'],
  verbose: true,
  dry: false
};

const config = {
  name: 'client',
  target: 'web',
  mode: 'production',
  entry: {
    main: './src/index.js',
    other: './src/other.js'
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    //  publicPath: '/',
    filename: './[name]-bundle.js'
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new CompressionPlugin({
      algorithm: 'gzip'
    }),
    new BrotliPlugin()
  ]
};

module.exports = merge(baseConfig, config);
