module.exports = (args, scope, evaluate) => {
  let array = [];
  for (let arg of args) {
    array.push(evaluate(arg, scope));
  }

  return array;
};