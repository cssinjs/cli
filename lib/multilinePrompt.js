module.exports = (callback) => {
  var buf = []
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', (val) => {
    if (val === '\n' || val === '\r\n') {
      process.stdin.removeAllListeners('data')
      callback(buf.join('\n'))
    } else {
      buf.push(val.trimRight())
    }
  }).resume()
}
