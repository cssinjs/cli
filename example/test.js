var css = [
  '.ninja {',
  '  visibility: hidden;',
  '  color: black;',
  '}'
].join('\n')

var css2jss = require('../lib/cssToJss.js')
var jss = css2jss(css)
console.log(JSON.stringify(jss, null, 2))
