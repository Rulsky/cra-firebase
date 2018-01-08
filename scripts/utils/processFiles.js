const { input } = require('../../config/filelist')
const flattenArray = require('./flattenArray')
const readFilenames = require('./readFilenames')
const filterFiles = require('./filterFiles')
const transform = require('./transform')
const configureBabel = require('./configureBabel')

const inputPathKeys = Object.keys(input)
const babelConf = configureBabel()

const processFiles = (rFilenames = readFilenames, ff = filterFiles, tf = transform) =>
  Promise.all(flattenArray(inputPathKeys.map(key =>
    rFilenames(input[key])
      .filter(ff)
      .map(f => tf(f, babelConf)))))

module.exports = processFiles
