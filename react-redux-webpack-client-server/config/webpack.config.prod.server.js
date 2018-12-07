const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');
var nodeExternals = require('webpack-node-externals');

const config = {
  //  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],

  entry: {
    server: ['./server/index.js']
  }
};

module.exports = merge(commonConfig, config);

/*

module.exports = {
  name: "server",
  target: "node",
  externals: nodeExternals(),
  entry: "./src/server/render.js",
  mode: "production",
  output: {
    filename: "prod-server-bundle.js",
    path: path.resolve(__dirname, "../build"),
    libraryTarget: "commonjs2"
  },


  */

console.log(merge(commonConfig, config));
