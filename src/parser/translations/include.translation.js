module.exports = (args) => {
  return `include(${args.join(',').replace(',as', '')}),`
}