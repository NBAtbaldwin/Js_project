var path = require('path');

module.exports = {
  entry: './scripts/entry.js',
  output: {
    path: __dirname,
    filename: './scripts/bundle.js',
  },
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*']
  }
};
