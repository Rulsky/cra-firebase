const path = require('path')
const { outputFile } = require('fs-extra')
const chalk = require('chalk')
const { tf, readFilenames, flattenArray } = require('./utils')
const {
  root, input, srcDir, firebaseFunctionDir, outIndex,
} = require('../config/filelist')

const { log } = console
const env = process.env.BABEL_ENV
process.env.BABEL_ENV = 'production'

const okColor = [196, 226, 111]
const errorColor = (195, 27, 27)

log(chalk
  .rgb(...okColor)
  .inverse(`build.js was called with ${
    process.argv.slice(2) > 0 ? process.argv.slice(2) : 'no arguments'
  }`))

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
              outputFilename: makeOutputFileName(inputFilename, srcDir, firebaseFunctionDir),
            }
          })
          .then(({ transpiled, outputFilename }) => {
            log('file', outputFilename)
            return outputFile(outputFilename, transpiled)
          })
          .catch(error =>
            log(chalk.rgb(...errorColor).bold(`
              ERROR while working with:\n
              file: ${inputFilename}
              what's wrong:\n${error}
              `)))))

const results = flattenArray(processFiles())

Promise.all(results)
  .then(() => {
    process.env.BABEL_ENV = env
  })
  .then(() => log(chalk.rgb(...okColor).inverse('finish successfully')))
  .catch(error => log(chalk.rgb(...errorColor).bold(`${error}`)))
