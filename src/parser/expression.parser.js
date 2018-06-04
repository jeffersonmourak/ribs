const removeSpaces = require('./removeSpaces.parser');

function parseApply(expr, program) {
  program = removeSpaces(program);
  if (program[0] != "(") {
    return {expr: expr, rest: program};
  }

  program = removeSpaces(program.slice(1));
  expr = {type: "apply", operator: expr, args: []};
  while (program[0] != ")") {
    let arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = removeSpaces(arg.rest);
    if (program[0] == ",") {
      program = removeSpaces(program.slice(1));
    } else if (program[0] != ")") {
      console.log(program)
      throw new SyntaxError("Expected ',' or ')'");
    }
  }
  return parseApply(expr, program.slice(1));
}

function parseExpression (program) {
  program = removeSpaces(program);
  let match, expr;
  if (match = /^"([^"]*)"/.exec(program)) {
    expr = {type: "value", value: match[1]};
  } else if (match = /^\d+\b/.exec(program)) {
    expr = {type: "value", value: Number(match[0])};
  } else if (match = /^[^\s(),"]+/.exec(program)) {
    expr = {type: "word", name: match[0]};
  } else {
    throw new SyntaxError("Unexpected syntax: " + program);
  }

  return parseApply(expr, program.slice(match[0].length));
}

module.exports = parseExpression;