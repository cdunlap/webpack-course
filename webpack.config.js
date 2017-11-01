var path = require('path');

module.exports = {
  entry: __dirname,
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
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
        include: path.resolve(__dirname, 'config')
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: path.resolve(__dirname, 'ts')
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
        loaders: ['style-loader', 'css-loader', 'sass-loader']
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
      api$: path.resolve(__dirname, 'api.js'),
      styles: path.resolve(__dirname, 'styles'),
      ts: path.resolve(__dirname, 'ts'),
      welcomeUser$: path.resolve(__dirname, 'welcomeUser.coffee')
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    inline: true,
    port: 3000
  }
}
