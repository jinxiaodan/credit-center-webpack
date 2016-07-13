'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');
let glob = require('glob');
let srcBase = path.join(__dirname, '../src/js/');
// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');


// 多入口文件
function getEntrys() {
  var entrys = {};
  //var src = new RegExp(__dirname.replace(/\\/g, "/") + "/src/");
  glob.sync(srcBase + '*.js').forEach(function(name) {
    // 前缀
    var srcBase2 = srcBase.replace(/\\/g, "/");
    var entry = name.replace(srcBase2, "");
    // 后缀
    entry = entry.replace(/\.js$/, "");
    //加入dev和hotload
    var entryArr = ['webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,'webpack/hot/only-dev-server',name];
    entrys[entry] = entryArr;
  });
  return entrys;
};

let config = Object.assign({}, baseConfig, {
  entry: getEntrys(),
  // entry: getEntrys(),
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [path.join(__dirname, '/../src')]
  )
});

module.exports = config;
