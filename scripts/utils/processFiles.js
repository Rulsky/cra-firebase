const { input } = require('../../config/filelist')

const flattenArray = require('./flattenArray')
const readFilenames = require('./readFilenames')
const filterFiles = require('./filterFiles')
const transform = require('./transform')

const inputPathKeys = Object.keys(input)

const processFiles = (rFilenames = readFilenames, ff = filterFiles, tf = transform) =>
  Promise.all(flattenArray(inputPathKeys.map(key =>
    rFilenames(input[key])
      .filter(ff)
      .map(tf))))

module.exports = processFiles
