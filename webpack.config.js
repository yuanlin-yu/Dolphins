const path = require('path');

module.exports = {
  mode: 'production',
  entry: './content-script.js',
  output: {
    filename: 'dolphins.min.js',
    path: path.resolve(__dirname, 'crx/dist')
  }
};