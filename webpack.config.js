'use strict';

const { resolve, join } = require('path'),
  { readdirSync, lstatSync } = require('fs'),
  webpack = require('webpack');

const examplesPath = './examples';
const examples = readdirSync(examplesPath);
const examplesEntry = {};
examples.forEach((name) => {
  if (!lstatSync(join(examplesPath, name)).isDirectory()) {
    return;
  }
  examplesEntry[name] = [`./${name}/index.js`];
});

module.exports = [{
    name: 'lib',
    context: resolve(__dirname),
    entry: {
      sonicnet: ['./lib/src/index.js']
    },
    output: {
      path: join(__dirname, 'lib', 'build'),
      filename: '[name].js',
    },
    plugins: [
      new webpack.NamedModulesPlugin()
    ],
    module: {
        rules: [{
            test: /\.js?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    devtool: "#source-map"
},{
    name: 'examples',
    context: resolve(__dirname, 'examples'),
    entry: examplesEntry,
    output: {
      path: join(__dirname, 'examples'),
      filename: '[name]/build/all.bundle.js',
    },
    plugins: [
      new webpack.NamedModulesPlugin()
    ],
    module: {
        rules: [{
            test: /\.js?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    devtool: "#source-map"
}];
