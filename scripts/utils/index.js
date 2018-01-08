const rm = require('./rm')
const readFilenames = require('./readFilenames')
const tf = require('./tf')
const flattenArray = require('./flattenArray')
const processFiles = require('./processFiles')
const callReactScriptsBuild = require('./callReactScriptsBuild')
const copyMarkup = require('./copyMarkup')

module.exports = {
  readFilenames,
  tf,
  flattenArray,
  processFiles,
  rm,
  callReactScriptsBuild,
  copyMarkup,
}
