const withPlugins = require('next-compose-plugins');
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = withPlugins([], {
  webpack: (config, options) => {
    if(config.resolve.plugins) config.resolve.plugins.push(new tsconfigPathsPlugin());
    else config.resolve.plugins = [new tsconfigPathsPlugin()];

    return config;
  }
})