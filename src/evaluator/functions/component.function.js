function buildComponent(name, attributes, children, selfClosing) {
  if (selfClosing) {
    return `<${name} ${attributes.join(' ')} />`;
  } else {
    return `<${name} ${attributes.join(' ')} > ${children} </${name}>`
  }
}
function renderComponent(name, attributes, children, selfClosing, localInit) {
  let component = buildComponent(name, attributes, children, selfClosing);

  if (localInit) {
    return `export default class Component extends React.Component {
  render() {
    return (
      ${component}
    );
  }
}`
  }

  return component;
}

module.exports = (args, scope, evaluate) => {
  let componentName = evaluate(args[0], scope),
      attributes = evaluate(args[1], scope) || [],
      selfClosing = evaluate(args[2], scope),
      localInit = false;
      children = false;

      
  if (!scope.__componentInitialized) {
    scope.__componentInitialized = true;
    localInit = true;
  }

  if (args[2] && !selfClosing) {
    try {
      children = evaluate(args[3], scope);
    } catch (e) {
      children = args[3].name;
    }
  }

  return renderComponent(componentName, attributes, children, selfClosing,localInit);
};