const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  externals: {
    Clappr: 'Clappr'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'clappr-create-portal.js',
    library: 'ClapprCreatePortal',
  },
  module: {
  loaders: [
    {
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true
  }
}
