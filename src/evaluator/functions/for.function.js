const parse = require('../../parser');

function getRangeData (args, evaluate, scope){
  try {
    return `[${evaluate(args[1], scope).join(', ')}]`;
  } catch (e) {
    return `this.props.${args[1].name}`;
  }
}

function addKey(iterator, arg, evaluate, scope) {
  if (!evaluate(arg.args[1], scope)) {
    arg.args[1] = parse.partial(`array(attribute("key", "${iterator}", true))`);
  }

  return arg;
}

module.exports = (args, scope, evaluate) => {
    let iterator = args[0].name,
      range = getRangeData(args, evaluate, scope);

      args[2] = addKey(iterator, args[2], evaluate, scope);

  return `{${range}.map((${iterator}) => (${evaluate(args[2], scope)}))}`;

};
