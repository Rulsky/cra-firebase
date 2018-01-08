const { removeSync } = require('fs-extra')
const spawn = require('cross-spawn')

const {
  processFiles, rm, callReactScriptsBuild, copyMarkup,
} = require('./utils')
const { craBuildIndex } = require('../config/filelist')
const { okOut, errOut, infoOut } = require('./utils/logging')

const build = (
  remove = rm,
  procFiles = processFiles,
  callRSBuild = callReactScriptsBuild,
  cpMarkup = copyMarkup,
) => {
  infoOut('setting BABEL_ENV to production')
  const env = process.env.BABEL_ENV
  process.env.BABEL_ENV = 'production'

  infoOut(`build.js was called with ${process.argv.slice(2).length > 0
    ? `next arguments: ${process.argv.slice(2)}`
    : 'no arguments'}\n`)

  return remove()
    .then(procFiles())
    .then(() => callRSBuild(spawn))
    .then(() => {
      infoOut('Start to copy html markup to server code')
      return cpMarkup()
    })
    .then(() => {
      infoOut('html markup copied successfully\nDeleting "build/index.html"')
      return removeSync(craBuildIndex)
    })
    .then(() => {
      infoOut('setting BABEL_ENV to original value')
      process.env.BABEL_ENV = env
    })
    .then(() => okOut('\nfinish successfully'))
    .catch((error) => {
      switch (error.type) {
        case 'CRA_BUILD':
          errOut('create-react-app build script failed', error)
          break
        case 'PROCESS_FILE':
          errOut(`ERROR while transpiling with babel this file:\nfile: ${error.inputFilename}\n what's wrong:`)
          console.error(error) // eslint-disable-line no-console
          break
        default:
          errOut('', error)
      }
    })
}

module.exports = build
