const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    __dirname + '/src/index.js'
  ],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['env', 'react'],
        plugins: ['transform-class-properties', 'react-hot-loader/babel', 'transform-runtime']
      }
    },
    {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }]
    }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin,
    new HtmlWebpackPlugin({
      title: 'My APP',
      template: __dirname + '/src/index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    hot: true,
    inline: true
  }
};
