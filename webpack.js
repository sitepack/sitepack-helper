'use strict';

const path = require('path');

function addEntry(entries, name, entry) {
  if (entries[name]) {
    throw new Error(`You cannot use "${name}" as route name, it is reserved!`);
  }

  entries[name] = entry;
}

function getAllModuleEntries() {
  const routes = require(path.join(process.cwd(), 'config','route.js'));

  const entries = {};

  routes.forEach(function(route) {
    if (!route.skipPrerender) {
      entries[route.name] = [route.module];
    }
  });

  addEntry(entries, 'prerender', ['./base/prerender.js']);
  addEntry(entries, 'render', ['./base/render.js']);

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
