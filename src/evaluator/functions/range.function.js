module.exports = (args, scope) => {
  let length = args[0].value,
      offset = args[1] ? args[1].value : 0;

  return Array.apply(null, { length: length }).map(Number.call, Number).map( n => n + offset );
};