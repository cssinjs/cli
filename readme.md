![JSS logo](https://avatars1.githubusercontent.com/u/9503099?v=3&s=60)

## CLI for JSS

A command line tool for JSS

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/cssinjs/lobby)

## Install

```bash
npm install jss-cli -g
```

## Usage

```bash
# print help
jss --help
```

### Convert CSS to JSS

```bash
# convert css to json
jss convert source.css -f json > source.js
# convert css to commonjs
jss convert source.css -f cjs > source.js
# convert css to es6
jss convert source.css -f es6 > source.js
```

### Convert JSS to CSS

You need either to run the cmd tool locally or to install jss globally, because it will try to require jss.
Also you can specify a path to jss. Same is about jss plugins.

```bash
# convert jss to css
jss convert source.js -f css > source.css
```

### API

```javascript
import { cssToJss } from 'jss-cli'

const css = `
  .ninja {
    visibility : hidden;
    color      : black;
  }
`
var jss = cssToJss({code: css})

console.log(JSON.stringify(jss, null, 2))
```

## License

MIT
