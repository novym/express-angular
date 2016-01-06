var path = require('path');
var webpack = require('webpack');
var NgAnnotatePlugin = require('ng-annotate-webpack-plugin');

var rootPath = __dirname;
var PATHS = {
  rootPath: rootPath,
  srcPath: path.resolve(rootPath, 'src'),
  angularPath: path.resolve(rootPath, 'node_modules', 'angular', 'angular.min.js'),
  appEntryPath: path.resolve(rootPath, 'src', 'main', 'bootstrap.js'),
  appBuildPath: path.resolve(rootPath, 'public')
};

var config = {
  debug: true,
  cache: true,
  watch: true,
  devtool:'source-map',
  name: 'angularapp',
  entry: {
    app: [PATHS.appEntryPath],
    vendor: ['angular']
  },
  resolve: {
    alias: {
      'angular': PATHS.angularPath
    }
  },
  output: {
    path: PATHS.appBuildPath,
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        loaders: ['eslint'],
        include: PATHS.srcPath
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'ng-annotate',
        exclude: /node_modules|bower_components/
      },
      {
        test: /\.html$/,
        loader: 'ngtemplate!html'
      }
    ],
    noParse: [PATHS.angularPath]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.optimize.DedupePlugin(),
    new NgAnnotatePlugin({
      add: true
    })
  ]
};

module.exports = config;
