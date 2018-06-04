const endTranslation = require('./end.translation');

function convertAttrToFn(attr) {
  let [attrName, attrValue] = attr.split('=');

  if (attrValue.includes('{')) {
    return `attribute("${attrName}", "this.props.${attrValue.slice(1, -1)}", true)`
  }

  return `attribute("${attrName}", "${attrValue.slice(1, -1)}", false)`
}

function translateAttrs(attrsStr) {
  let re = /((\S+)=["'{]?((?:.(?!["'}]?\s+(?:\S+)=|[>"'}]))+.)["'}]?)/g,
      filledAttrs = attrsStr.match(re),
      attrs = []
  
  if (filledAttrs) {
    for (let attr of filledAttrs) {
      attrsStr = attrsStr.replace(attr, '');
      attrs.push(convertAttrToFn(attr));
    }  
  }
  let emptyAttrs = attrsStr.trim().split(' ');

  if (attrsStr.trim() !== '') {
    for (let attrName of emptyAttrs) {
      attrs.push(`attribute("${attrName}", "")`)
    }
  }

  return `${attrs.join(`, `)}`;
}
module.exports = (args) => {
  let name = args.trim().split(' ')[0],
      attrsStr = args.replace(name, '').trim();

  if (name[0] === '/') { // close tag
    return endTranslation(name);
  } else if (name[name.length - 1] === '/') { //self closing tag
    let attrs = translateAttrs(attrsStr);
    return `component("${name.slice(0, -1)}", ${attrs !== '' ? `array(${attrs})` : 'false'}, true)\n`;
  }
  // normal tag
  let attrs = translateAttrs(attrsStr);
  return `component("${name}", ${attrs !== '' ? `array(${attrs})` : 'false'}, false,\n`;
}