const { processFiles, rm } = require('./utils')

const { okOut, errOut, infoOut } = require('./utils/logging')

const callReactScriptsBuild = require('./callReactScriptsBuild')
const copyMarkup = require('./copyMarkup')

const build = () => {
  const env = process.env.BABEL_ENV
  process.env.BABEL_ENV = 'production'

  infoOut(`build.js was called with ${process.argv.slice(2) > 0
    ? process.argv.slice(2)
    : 'no arguments'}\n`)

  return rm()
    .then(processFiles())
    .then(callReactScriptsBuild)
    .then(() => {
      infoOut('Start to copy html markup to server code')
      return copyMarkup()
    })
    .then(() => {
      infoOut('html markup copied successfully')
      process.env.BABEL_ENV = env
    })
    .then(() => okOut('\nfinish successfully'))
    .catch((error) => {
      switch (error.type) {
        case 'MARKUP':
          errOut(
            'Looks like CRA build script hasn\'t run before copying markup\nbecause this script couldn\'t find "index.html" in "build" directory.\nPlease, make sure that it present.\nThe rest of the infromation about the error:\n\n',
            error,
            '\n',
          )
          break
        case 'CRA_BUILD':
          errOut('create-react-app build script failed', error)
          break
        case 'PROCESS_FILE':
          errOut(`ERROR while transpiling with babel this file:\nfile: ${error.inputFilename}\n what's wrong:`)
          console.error(error) // eslint-disable-line no-console
          break
        default:
          errOut('unknowk error\n', error)
      }
    })
}

module.exports = build
