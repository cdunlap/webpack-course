var path = require('path');

module.exports = {
  entry: './app.js',
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
        test: /.ya?ml$/,
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
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    inline: true,
    port: 3000
  }
}
