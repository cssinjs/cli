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
  const ast = css.parse(options.code)
  let styles = {}
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
  const jssRules = {}

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
    const key = rule.selectors.join(', ')
    const style = rules[key] || (rules[key] = {})
    rule.declarations.forEach(function (decl) {
      if (decl.type === 'comment') return
      const property = formatProp(decl.property)
      if (property in style) {
        const fallbacks = style.fallbacks || (style.fallbacks = [])
        fallbacks.splice(0, 0, { [property]: style[property] })
      }
      style[property] = stripUnit(decl.value)
    })
  }

  function formatProp(prop) {
    // Capitalize the first character
    return options.dashes ? prop : (typeof prop === 'string' && prop.substring(0, 1) === '-') ?
      camelCase(prop).charAt(0).toUpperCase() : camelCase(prop)
  }

  cssRules.forEach(function (rule) {
    if (rule.type === 'comment') return
    switch (rule.type) {
      case 'rule':
        addRule(rule, jssRules)
        break
      case 'media': {
        const key = '@media ' + rule.media
        const value = jssRules[key] || (jssRules[key] = {})
        rule.rules.forEach(function(rule) {
          addRule(rule, value)
        })
        break
      }
      case 'font-face': {
        const key = '@' + rule.type
        const value = jssRules[key] || (jssRules[key] = {})
        rule.declarations.forEach(function (decl) {
          value[formatProp(decl.property)] = decl.value
        })
        break
      }
      case 'keyframes': {
        const key = '@' + rule.type + ' ' + rule.name
        const value = jssRules[key] || (jssRules[key] = {})
        rule.keyframes.forEach(function (keyframe) {
          const frameKey = keyframe.values.join(', ')
          const frameValue = value[frameKey] || (value[frameKey] = {})
          keyframe.declarations.forEach(function (decl) {
            frameValue[formatProp(decl.property)] = stripUnit(decl.value)
          })
        })
      }
    }
  })

  return {'@global': jssRules}
}
