var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'app', 'entryPoints', 'main'),
    tweets: path.resolve(__dirname, 'app', 'entryPoints', 'tweets'),
    vendor: ['jquery', 'bootstrap', 'react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        query: require(path.resolve(__dirname, 'eslint.config.js'))
      }
    ],
    loaders: [
      {
        test: /\.ya?ml$/,
        loaders: ['json-loader', 'yaml-loader'],
        include: path.resolve(__dirname, 'app', 'config')
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: path.resolve(__dirname, 'app', 'ts')
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        // loaders: ['style-loader', 'css-loader', 'sass-loader']
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader') // Sass -> CSS -> into a style chunk -> ExtractText
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.coffee', '', '.ts', '.css', '.scss'],
    alias: {
      api$: path.resolve(__dirname, 'app', 'api.js'),
      ts: path.resolve(__dirname, 'ts'),
      reactApp$: path.resolve(__dirname, 'app', 'react')
    }
  },
  plugins: [
    new ExtractTextPlugin('main.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      chunks: ['vendor']
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    inline: true,
    port: 3000
  }
}
