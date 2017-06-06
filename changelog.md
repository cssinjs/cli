## 4.2.1 / 2017-06-06

- Detect a compound/multi value.
- Fix camelization.
- Fix path detection.

## 4.2.0 / 2017-05-23

- Use local jss version if no version is provided when converting from css
- Added --dashes option to convert to js using dashes, camelizes by default now
- Added --unit option which allows to strip units which match the passed unit from the values and make it a number value

## 4.0.1 / 2017-05-23

- Nicer output format for js objects

## 4.0.0 / 2017-05-23

- Added multiline source input mode --multiline
- Added inline source input mode - source instead of path
- New option --export which defines the exports format - cjs, es6
- Old option --format now takes css, js, json, defaults to js
