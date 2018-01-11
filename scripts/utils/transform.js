const path = require('path')
const { outputFile } = require('fs-extra')
const { errOut } = require('./logging')

const {
  srcDir,
  firebaseFunctionsDir,
  outIndex,
  serverIndexInput,
} = require('../../config/filelist')

const tf = require('./tf')
const outputName = require('./outputName')

const transform = (inputFilename, errOutput = errOut) =>
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
    .catch(error => errOutput(`${error.stack}`))

module.exports = transform
