module.exports = (args) => {
  return `for(${args.join(',').replace(',in', '')},`
}