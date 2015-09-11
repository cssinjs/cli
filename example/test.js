var css = [
  '.ninja {',
  '  visibility: hidden;',
  '  color: black;',
  '}'
].join('\n')

var cssToJss = require('..').cssToJss
var jss = cssToJss(css)
console.log(JSON.stringify(jss, null, 2))
