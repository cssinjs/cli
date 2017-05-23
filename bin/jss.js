#!/usr/bin/env node

var fs = require('fs')
var path = require('path')
var program = require('commander')
var util = require('util')
var converters = require('../index')
var multilinePrompt = require('../lib/multilinePrompt')
var execModule = require('../lib/execModule')

function list(val) {
  return val.split(',').map(function(str) {
    return str.trim()
  });
}

var formatConverterMap = {
  js: converters.cssToJss,
  json: converters.cssToJss,
  css: converters.jssToCss
}

function convert(src) {
  var converter = formatConverterMap[program.format]

  // We assume its a path.
  if (src.indexOf(path.sep) !== -1) {
    if (!path.isAbsolute(src)) src = path.resolve(process.cwd(), src)
    src = fs.readFileSync(src, 'utf-8')
  }

  if (program.format === 'css') {
    return converter({
      styles: execModule(src),
      jss: program.jss,
      plugins: program.plugins
    })
  }

  var converted = converter({code: src})
  var output

  switch (program.format) {
    case 'js':
      output = util.inspect(converted, {depth: null})
      break
    case 'json':
      output = JSON.stringify(converted, null, 2)
      break
  }

  switch (program.export) {
    case 'cjs':
      output = 'module.exports = ' + output + ';'
      break
    case 'es6':
      output = 'export default ' + output + ';'
      break
  }

  return output
}

program
  .version(require('../package.json').version)
  .usage('[command] [options]')
  .option('-m, --multiline', 'multiline prompt for the source input')
  .option('-f, --format [format]', 'target format, possible values: css, js, json, defaults to js', 'js')
  .option('-e, --export [export]', 'how to export the object: cjs, es6', '')
  .option('-j, --jss [jss]', 'path to a module with jss instance as a default export', 'jss')
  .option('--plugins [plugins]', 'plugins to use in case --jss option hasn\'t been used', list, [])

program
  .command('convert [src]')
  .action(function onConvert(src) {
    if (src) console.log(convert(src))
    else if (program.multiline) {
      console.log('Input source:')
      multilinePrompt((src) => {
        try {
          console.log(converter({code: src}) + '\n')
        } catch (err) {
          console.log(err.message)
        }
        onConvert()
      })
    } else {
      program.help()
    }
  })

program.parse(process.argv)

if (!program.args.length) return program.help()
