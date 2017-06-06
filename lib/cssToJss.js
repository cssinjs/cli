const css = require('css')
const camelCase = require('lodash/camelCase')

/**
 * Convert css to jss.
 *
 * @param {Object} options
 * @return {Object}
 * @api public
 */
module.exports = function (options) {
  var ast = css.parse(options.code)
  var styles = {}
  if (ast.stylesheet && ast.stylesheet.rules) {
    styles = toJssRules(ast.stylesheet.rules, options)
  }
  return styles
}

/**
 * Convert rules from css ast to jss style.
 *
 * @param {Array} cssRules
 * @param {Object} options
 * @return {Object}
 */
function toJssRules(cssRules, options) {
  var jssRules = {}

  function stripUnit(value) {
    if (
      !options.unit ||
      // Detect a compound/multi value.
      /\s|,/.test(value)
    ) return value

    const unit = value.substr(value.length - options.unit.length)
    const num = parseFloat(value)
    if (unit === options.unit && num !== NaN) {
      return num
    }
    return value
  }

  function addRule(rule, rules) {
    if (rule.type === 'comment') return
    var key, style = {}
    key = rule.selectors.join(', ')
    rule.declarations.forEach(function (decl) {
      style[formatProp(decl.property)] = stripUnit(decl.value)
    })
    rules[key] = style
  }

  function formatProp(prop) {
    return options.dashes ? prop : camelCase(prop)
  }

  cssRules.forEach(function (rule) {
    if (rule.type === 'comment') return
    switch (rule.type) {
      case 'rule':
        addRule(rule, jssRules)
        break
      case 'media':
        var key = '@media ' + rule.media
        var value = {}
        rule.rules.forEach(function(rule) {
          addRule(rule, value)
        })
        jssRules[key] = value
        break
      case 'font-face':
        var key = '@' + rule.type
        var value = {}
        rule.declarations.forEach(function (decl) {
          value[formatProp(decl.property)] = decl.value
        })
        jssRules[key] = value
        break
      case 'keyframes':
        var key = '@' + rule.type + ' ' + rule.name
        var value = {}
        rule.keyframes.forEach(function (keyframe) {
          var frameKey = keyframe.values.join(', ')
          var frameValue = {}
          keyframe.declarations.forEach(function (decl) {
            frameValue[formatProp(decl.property)] = stripUnit(decl.value)
          })
          value[frameKey] = frameValue
        })
        jssRules[key] = value
    }
  })

  return {'@global': jssRules}
}
