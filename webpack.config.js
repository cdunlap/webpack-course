var path = require('path');

module.exports = (env) => {
  const webpackConfigPath = path.resolve(__dirname, 'config', `${env}.webpack.config.js`);

  console.log(webpackConfigPath);
  const webpackConfig = require(webpackConfigPath)(env);

  return webpackConfig;
}
