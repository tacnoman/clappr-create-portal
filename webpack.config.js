const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  externals: {
    clappr: 'Clappr'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'clappr-create-portal.js',
    library: 'ClapprCreatePortal',
    libraryTarget: 'umd',
    publicPath: '/latest'
  },
  module: {
  loaders: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        compact: true,
      }
    }]
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {comments: false}
    })
  ]
}
