## CLI for JSS

A command line tool for JSS

## Install

```bash
npm install jss-cli -g
```

## Usage

```bash
# print help
jss
```

### Convert CSS to JSS

```bash
# convert css
jss source.css -p > source.jss
```

### API

```javascript
var css = [
  '.ninja {',
  '  visibility: hidden;',
  '  color: black;',
  '}'
].join('\n')

var cssToJss = require('..').cssToJss
var jss = cssToJss(css)
console.log(JSON.stringify(jss, null, 2))
```

## License

MIT
