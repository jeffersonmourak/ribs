const parse = require('./parser');
const topScope = Object.create(null);
const evaluate = require('./evaluator');

topScope.true = true;
topScope.false = false;

for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
  topScope[op] = Function("a, b", `return a ${op} b;`);
}

function compile(program) {
  return evaluate(parse(program), { ...topScope });
}

module.exports = compile;