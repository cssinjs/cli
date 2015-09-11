var css = [
  '.ninja {',
  '  visibility: hidden;',
  '  color: black;',
  '}'
].join('\n')

var css2jss = require('..').cssToJss
var jss = css2jss(css)
console.log(JSON.stringify(jss, null, 2))
