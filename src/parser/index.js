const removeSpaces = require('./removeSpaces.parser');
const parseExpression = require('./expression.parser');
const translator = require('./translator.parser');

function partialParse(program) {
  let {expr, rest} = parseExpression(program);
  
  if (removeSpaces(rest).length > 0) {
    throw new SyntaxError("Unexpected text after program");
  }
  return expr;
}

function parse(program) {
  return partialParse(`do(include("react", React), ${translator(program)})`);
}

parse.partial = partialParse;

module.exports = parse;