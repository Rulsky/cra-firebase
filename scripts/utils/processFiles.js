const path = require('path')
const { outputFile } = require('fs-extra')

const {
  input, srcDir, firebaseFunctionsDir, outIndex,
} = require('../../config/filelist')

const tf = require('./tf')
const readFilenames = require('./readFilenames')
const flattenArray = require('./flattenArray')
const outputName = require('./outputName')

const filterFiles = filename =>
  (filename.substr(-3) === '.js' ||
    filename.substr(-4) === '.jsx' ||
    filename.substr(-4) === '.svg') &&
  filename.substr(-7) !== 'spec.js' &&
  filename.substr(-7) !== 'test.js'

const processFiles = () =>
  Promise.all(flattenArray(Object.keys(input).map(key =>
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
          })))))

module.exports = processFiles
