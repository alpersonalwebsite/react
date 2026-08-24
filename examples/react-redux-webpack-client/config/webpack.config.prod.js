const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// clean-webpack-plugin v3, which is what package.json declares, differs from v1/v2
// in three ways that all mattered here:
//
//   1. it is a NAMED export, so `require('clean-webpack-plugin')` is an object,
//      and calling it gave `TypeError: CleanWebpackPlugin is not a constructor`,
//   2. it takes ONE options object rather than `(paths, options)`,
//   3. it cleans relative to `output.path`, and it dropped `root` and `exclude`.
//
// That third change is the one worth reading twice. Translating the old options
// mechanically, keeping `root` and `exclude`, produces a config that runs and
// cleans NOTHING: v3 ignores both keys, and the old patterns ('public/') then
// point at a directory inside output.path, which is public/ itself. The clean
// step silently becomes a no-op, which looks exactly like a working build.
//
// So the patterns are rewritten relative to output.path, and the exclusions
// become negations. `images` is protected here and was NOT in the old exclude
// list, so a working v1/v2 build would have deleted public/images.
let cleanOptions = {
  cleanOnceBeforeBuildPatterns: [
    '**/*',
    '!template.html',
    '!manifest.json',
    '!favicon.ico',
    '!index.html',
    '!images',
    '!images/**'
  ],
  verbose: true,
  dry: false
};

const config = {
  stats: {
    colors: true
  },
  mode: 'production',
  plugins: [new CleanWebpackPlugin(cleanOptions)]
};

module.exports = merge(baseConfig, config);
