# CLI for JSS

A command line tool for JSS

[![Gitter](https://badges.gitter.im/JoinChat.svg)](https://gitter.im/cssinjs/lobby)

## Convert CSS to JSS

```bash
# convert css to json
jss convert source.css -f json > source.js
# convert css to commonjs
jss convert source.css -f js -e cjs > source.js
# convert css to es6
jss convert source.css -f js -e es6 > source.js
```

## Convert JSS to CSS

You need either to run the cmd tool locally or to install JSS globally, because it will try to require JSS.
Also you can specify a path to JSS. Same is about JSS plugins.

```bash
# convert jss to css
jss convert source.js -f css > source.css
```

## API

```javascript
import {cssToJss} from 'jss-cli'

const css = `
  .container {
    visibility : hidden;
    color: black;
  }
`
cssToJss({code: css})
```

## Install

```bash
npm install jss-cli -g
```

## License

MIT
