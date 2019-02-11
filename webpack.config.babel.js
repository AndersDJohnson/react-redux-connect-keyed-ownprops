const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = (env = {}) => ({
  target: env.demo ? undefined : 'node',
  output: env.demo
    ? undefined
    : {
        libraryTarget: 'commonjs2'
      },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  optimization: {
    minimize: false
  },
  externals: [env.demo ? null : nodeExternals()].filter(Boolean),
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react-redux-connect-keyed-ownprops example'
    })
  ]
})
