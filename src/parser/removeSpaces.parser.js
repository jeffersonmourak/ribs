module.exports = function (string) {
  let first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}