var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',

  entry: [
    'bootstrap-loader',
    'font-awesome-sass-loader',
    path.join(__dirname, "src", "index.js")
  ],

  output: {
    path: path.join(__dirname, "dist"),
    filename: "/assets/bundle.js"
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/[name].[ext]' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=assets/[name].[ext]' },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new CopyWebpackPlugin([
      { from: 'src/images', to: 'assets/images' },
      { from: 'src/fonts', to: 'assets/fonts' }
    ]),
    new WriteFilePlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.tmpl.html")
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    colors: true,
    historyApiFallback: true,
    inline: true,
    outputPath: path.join(__dirname, "dist")
  }
};
