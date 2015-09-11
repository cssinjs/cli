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
import {cssToJss} from 'jss-cli'
cssToJss(css, options)
```

## License

MIT
