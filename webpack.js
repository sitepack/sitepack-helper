'use strict';

const path = require('path');

function getAllModuleEntries() {
  const routes = require(path.join(process.cwd(), 'config','route.js'));

  const entries = {};

  routes.forEach(function(route) {
    entries[route.name] = [route.module];
  });

  if (entries.layout) {
    throw new Error('You cannot use "main" as route name! It is reserved!');
  }

  entries.layout = ['./base/layout.js'];

  return entries;
}

function check(loader) {
  if (loader.indexOf('style-loader') !== -1) {
    throw "Error: Please remove 'style-loader' in style-loader.js: " + loader;
  }
}

function bundleStyle(loaders) {
  return loaders.map((loader) => {
    check(loader.loader);
    return { test: loader.test, loader: 'style-loader!' + loader.loader };
  });
}

function extractStyle(loaders, ExtractTextPlugin) {
  return loaders.map((loader) => {
    check(loader.loader);
    return {
      test: loader.test,
      loader: ExtractTextPlugin.extract('style-loader', loader.loader)
    };
  });
}

module.exports = {
  getAllModuleEntries,
  bundleStyle,
  extractStyle
};
