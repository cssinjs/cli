const jss = require('jss').default
const preset = require('jss-preset-default').default

jss.setup(preset())

module.exports = function(options) {
  var localJss = jss
  if (options.jss) {
    localJss = require(options.jss)
    options.plugins.forEach(function(name) {
      var exports = require(name)
      var plugin = exports.default || exports
      jss.use(plugin())
    })
  }
  return localJss.createStyleSheet(options.styles).toString()
}
