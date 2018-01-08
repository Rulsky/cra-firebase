const path = require('path')
const { outputFile } = require('fs-extra')

const {
  srcDir,
  firebaseFunctionsDir,
  outIndex,
  serverIndexInput,
} = require('../../config/filelist')

const tf = require('./tf')
const outputName = require('./outputName')

const transform = inputFilename =>
  tf(inputFilename)
    .then((transpiled) => {
      if (path.basename(inputFilename) === serverIndexInput) {
        return {
          transpiled,
          outputFilename: outIndex,
        }
      }

      return {
        transpiled,
        outputFilename: outputName(inputFilename, srcDir, firebaseFunctionsDir),
      }
    })
    .then(({ transpiled, outputFilename }) => outputFile(outputFilename, transpiled))
    .catch((error) => {
      /* eslint-disable no-param-reassign */
      error.type = 'PROCESS_FILE'
      error.inputFilename = inputFilename
      /* eslint-enable no-param-reassign */
      return Promise.reject(error)
    })

module.exports = transform
