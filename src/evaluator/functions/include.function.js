const path = require('path');
function createName(pathName) {
  return path.basename(pathName).split('.')[0];
}

module.exports = (args, scope) => {
  let componentPath = args[0].value,
      componentName = args[1] ? args[1].name : createName(componentPath);

  return `import { default as ${componentName} } from '${componentPath}';`
};