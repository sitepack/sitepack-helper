'use strict';

const path = require('path');
const fs = require('fs');

const routes = require(path.join(process.cwd(), 'config', 'route.js'));

function write(loaders) {
  const result = `'use strict';
module.exports =  {
${loaders.join(',\n')}
};`;

  const fileName = path.join(process.cwd(), 'routeModules.js');
  fs.writeFileSync(fileName, result);
  console.log(`[Done] ${fileName}`);
}

function gen() {
  const modules = routes.map(function(route) {
    return `${route.name}: require('bundle?lazy&name=${route.name}!${route.module}')`;
  });

  write(modules);
}

module.exports = {
  gen
};
