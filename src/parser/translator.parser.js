const translator = require('./translations');

function getExpressionTranslation(translation) {
  translation = translation.split(' ');
  return translator[translation[0]]([...translation].splice(1));
}

function getCode(program) {
  var re = /<([^>]+)?>/gm;

  for (let line of program.split('\n')){
    let match = line.trim().match(re);

    if (match) {
      if (match[0].includes('<--')) {
        program = program.replace(match[0], getExpressionTranslation(match[0].replace('<--', '').replace('-->', '').trim()))
      } else {
        for(let matchCase of match) {
          program = program.replace(matchCase, translator.component(matchCase.replace('<', '').replace('>', '')))
        }
      }
    }
  }

  return program;
}

module.exports = getCode;