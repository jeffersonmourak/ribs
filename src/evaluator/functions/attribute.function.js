module.exports = (args, scope, evaluate) => {
  let attrName = evaluate(args[0], scope),
      attrValue = evaluate(args[1], scope),
      isProps = args[2] ? evaluate(args[2], scope) : false;

  if (isProps) {
    return `${attrName}={ ${attrValue} }`;
  } else if (attrValue === '') {
    return `${attrName}`;
  }

  return `${attrName}="${attrValue}"`;
};