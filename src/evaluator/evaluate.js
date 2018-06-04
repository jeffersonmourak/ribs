const doFn = require('./functions/do.function');
const forFn = require('./functions/for.function');
const includeFn = require('./functions/include.function');
const rangeFn = require('./functions/range.function');
const componentFn = require('./functions/component.function');
const arrayFn = require('./functions/array.function');
const attributeFn = require('./functions/attribute.function');
const printFn = require('./functions/print.function');

const globalFunctions = {
  do: (args, scope) => doFn(args, scope, evaluate),
  for: (args, scope) => forFn(args, scope, evaluate),
  include: (args, scope) => includeFn(args, scope, evaluate),
  range: (args, scope) => rangeFn(args, scope, evaluate),
  component: (args, scope) => componentFn(args, scope, evaluate),
  array: (args, scope) => arrayFn(args, scope, evaluate),
  attribute: (args, scope) => attributeFn(args, scope, evaluate),
  print: (args, scope) => printFn(args, scope, evaluate),
}

function evaluate(expr, scope) {
  if (expr.type == "value") {
    return expr.value;
  } else if (expr.type == "word") {
    if (expr.name in scope) {
      return scope[expr.name];
    } else {
      throw new ReferenceError(
        `Undefined binding: ${expr.name}`);
    }
  } else if (expr.type == "apply") {
    let {operator, args} = expr;
    if (operator.type == "word" && operator.name in globalFunctions) {
      return globalFunctions[operator.name](expr.args, scope);
    } else {
      let op = evaluate(operator, scope);
      if (typeof op == "function") {
        return op(...args.map(arg => evaluate(arg, scope)));
      } else {
        throw new TypeError("Applying a non-function.");
      }
    }
  }
}

module.exports = evaluate;