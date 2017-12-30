const path = require('path')
const { outputFile } = require('fs-extra')
const spawn = require('cross-spawn')
const { tf, readFilenames, flattenArray } = require('./utils')
const copyMarkup = require('./copyMarkup')
const {
  root, input, srcDir, firebaseFunctionsDir, outIndex,
} = require('../config/filelist')
const { okOut, errOut, infoOut } = require('./utils/logging')

const env = process.env.BABEL_ENV
process.env.BABEL_ENV = 'production'

infoOut(`build.js was called with ${
  process.argv.slice(2) > 0 ? process.argv.slice(2) : 'no arguments'
}\n`)

const makeOutputFileName = (filename, currDir, destDir) => {
  const relName = filename.split(`${currDir}${path.sep}`)[1]
  return path.join(root, destDir, relName)
}

const filterFiles = filename =>
  (filename.substr(-3) === '.js' ||
    filename.substr(-4) === '.jsx' ||
    filename.substr(-4) === '.svg') &&
  filename.substr(-7) !== 'spec.js' &&
  filename.substr(-7) !== 'test.js'

const processFiles = () =>
  Object.keys(input).map(key =>
    readFilenames(input[key])
      .filter(filterFiles)
      .map(inputFilename =>
        tf(inputFilename)
          .then((transpiled) => {
            if (path.basename(inputFilename) === 'server.index.js') {
              return {
                transpiled,
                outputFilename: outIndex,
              }
            }

            return {
              transpiled,
              outputFilename: makeOutputFileName(inputFilename, srcDir, firebaseFunctionsDir),
            }
          })
          .then(({ transpiled, outputFilename }) => outputFile(outputFilename, transpiled))
          .catch(error =>
            errOut(`ERROR while working with:\n
              file: ${inputFilename}
              what's wrong:\n${error}
            `))))

const results = flattenArray(processFiles())

Promise.all(results)
  .then(() => {
    const result = spawn.sync('node', ['node_modules/react-scripts/scripts/build.js'], {
      stdio: 'inherit',
    })
    if (result.signal) {
      const err = new Error('error while building client code')
      err.type = 'CRA_BUILD'
      return err
    }
    return result
  })
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
          'Looks like CRA build script hasn\'t run before copying markup because \nthis script couldn\'t find "index.html" in "build" directory.\nPlease, make sure that it present.\nThe rest of the infromation about the error:\n',
          error,
        )
        break
      case 'CRA_BUILD':
        errOut('create-react-app build script failed', error)
        break
      default:
        errOut('unknowk error\n', error)
    }
  })
