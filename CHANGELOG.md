## [1.5.1] - 2018 MAR 08
### Improved
- put seed dir into npm inclusion
- docs update

## [1.5.0] - 2018 MAR 08
### Added
- Seed source code with grapQL server and styled server-side rendering
### Improved
- during init scripts injects more commands into consumer's package.json for easier development

## [1.4.0] - 2018 MAR 05
### Improved
- markup generation function now accepts additional string (as the third argument) of html nodes which are injected into head

## [1.3.0] - 2018 MAR 04
### Added
- upon build `npm i` is run in functions dir
### Improved
- markup generation function now accepts additional object which add global vars into SSR markup

## [1.2.0] - 2018 FEB 23
### Added
- add version output with 'vesrion' command
- add start command to watch for source and compile

## [1.1.3] - 2018 FEB 21
### Fixed
- output filenames extension is now '.js'
### Adressed issues
- assets like SVG and css addressed in readme

## [1.1.2] - 2018 JAN 18
### Fixed
- addRewrites produced broken `firebase.json`.
### Added
- interactive init script with preserved default behavior if `-y` flag is passed.

## [1.1.1] - 2018 JAN 17
### Added
- add insertion of rewrite rule into firebase.json
