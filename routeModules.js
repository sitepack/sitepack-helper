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

function gen(opt) {
  const modules = routes.map(function(route) {
    let loader;
    if (opt && opt.lazy) {
      loader = `bundle?lazy&name=${route.name}!`;
    } else {
      loader = '';
    }

    return `${route.name}: require('${loader}${route.module}')`;
  });

  write(modules);
}

module.exports = {
  gen
};
