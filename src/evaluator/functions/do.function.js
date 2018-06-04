module.exports = (args, scope, evaluate) => {
  let value = ``;
  for (let arg of args) {
    value =`${value}\n${evaluate(arg, scope)}`;
  }
  return value;
};