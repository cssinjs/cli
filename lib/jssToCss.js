module.exports = function(options) {
  var jss = require(options.jss)
  options.plugins.forEach(function(name) {
    var exports = require(name)
    var plugin = exports.default || exports
    jss.use(plugin())
  })
  return jss.createStyleSheet(options.styles).toString()
}
