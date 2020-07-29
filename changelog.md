## 6.0.1 / 2020-07-29

- Fix escaping [#19](https://github.com/cssinjs/cli/pull/19)

## 6.0.0 / 2020-04-21

- Upgrade to JSS v10
- Fix for formatProp

## 5.0.2 / 2018-10-07

- Fix CSS file path without slashes

## 5.0.1 / 2018-01-26

- Fixed camelization for vendor prefixed properties
- Update JSS and preset to the latest versions
- Updated CSS package to the latest

## 5.0.0 / 2017-10-13

- Update to JSS v9 and preset v4

## 4.2.2 / 2017-10-13

- Ignore CSS inline comments.
- Handle fallbacks.
- Merge value of rules with the same key.

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
