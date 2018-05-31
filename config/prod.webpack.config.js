var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function (env) {
  return {
    entry: {
      main: path.resolve(__dirname, '..', 'app', 'entryPoints', 'main'),
      tweets: path.resolve(__dirname, '..', 'app', 'entryPoints', 'tweets'),
      vendor: ['jquery', 'bootstrap', 'react', 'react-dom']
    },
    output: {
      path: path.join(__dirname, '..', 'build-prod'),
      filename: '[name].[chunkhash].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          query: require(path.resolve(__dirname, 'eslint.config.js'))
        },
        {
          test: /\.ya?ml$/,
          loaders: ['json-loader', 'yaml-loader'],
          include: path.resolve(__dirname, '..', 'app', 'config')
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          include: path.resolve(__dirname, '..', 'app', 'ts')
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
          loader: ExtractTextPlugin.extract({fallback: 'style-loader', use:'css-loader!sass-loader'}) // Sass -> CSS -> into a style chunk -> ExtractText
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
          loader: 'url-loader?limit=100000'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.coffee', '.ts', '.css', '.scss'],
      alias: {
        api$: path.resolve(__dirname, '..', 'app', 'api.js'),
        ts: path.resolve(__dirname, '..', 'ts'),
        reactApp$: path.resolve(__dirname, '..', 'app', 'react')
      }
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.[chunkhash].bundle.js',
        chunks: ['vendor']
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, '..', 'app', 'entryPoints', 'main', 'index.html'),
        hash: true,
        chunks: ['vendor', 'main'],
        minify: {
          collapseWhitespace: true
        }
      }),
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, '..', 'app', 'entryPoints', 'tweets', 'index.html'),
        hash: true,
        chunks: ['vendor', 'tweets'],
        filename: 'tweets.html',
        minify: {
          collapseWhitespace: true
        }
      }),
      new cleanWebpackPlugin(['build-prod'], {
        root: path.resolve(__dirname),
        verbose: true,
        exclude: ['ignore.js']
      }),
      new optimizeCssAssetsWebpackPlugin({
        cssProcessorOptions: {discardComments: {removeAll: true}}
      })
    ],
    devServer: {
      contentBase: path.resolve(__dirname, '..', 'build-prod'),
      inline: true,
      port: 3000
    }
  }
}
