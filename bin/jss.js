#!/usr/bin/env node

var fs = require('fs')
var path = require('path')
var program = require('commander')
var converters = require('../index')

function list(val) {
  return val.split(',').map(function(str) {
    return str.trim()
  });
}

var formatConverterMap = {
  json: converters.cssToJss,
  cjs: converters.cssToJss,
  es6: converters.cssToJss,
  css: converters.jssToCss
}

function convert() {
  var converter = formatConverterMap[program.format]

  if (!converter) {
    throw new Error('Bad option "format".')
  }

  if (program.format === 'css') {
    var styles = require(program.path)
    var output = converter({
      styles: styles,
      jss: program.jss,
      plugins: program.plugins
    })

  } else {
    var code = fs.readFileSync(program.path, 'utf-8')
    var converted = converter({code: code})
    var output = JSON.stringify(converted, null, program.pretty ? 2 : 0)

    switch (program.format) {
      case 'cjs':
        output = 'module.exports = ' + output + ';'
        break
      case 'es6':
        output = 'export default ' + output
        break
    }
  }

  return output
}

program
  .version(require('../package.json').version)
  .usage('[command] [options]')
  .option('-p, --pretty', 'prettify jss result')
  .option('-f, --format <format>', 'possible target formats are css, json, cjs, es6')
  .option('-j, --jss [jss]', 'path to a module with jss instance as a default export', 'jss')
  .option('--plugins [plugins]', 'plugins to use in case --jss option hasn\'t been used', list, [])

program
  .command('convert <file>')
  .action(function(file) {
    if (file[0] != '/') file = path.resolve(process.cwd(), file)
    program.path = file
  })

program.parse(process.argv)

if (!program.args.length) return program.help()

console.log(convert())
