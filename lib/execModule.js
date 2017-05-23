var vm = require('vm')

module.exports = (src) => {
  var contextExports = {}
  var context = vm.createContext({module: {exports: contextExports}})
  vm.runInContext(src, context)
  return context.module.exports
}
