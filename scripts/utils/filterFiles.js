const getFilterFiles = require('./getFilterFiles')

const filterFiles = (filename) => {
  const ft = getFilterFiles()
  const includedResults = ft.include.map(ftype => filename.substr(-ftype.length) === ftype)
  const excludedResults = ft.exclude.map(ftype => filename.substr(-ftype.length) !== ftype)
  return includedResults.includes(true) && !excludedResults.includes(false)
}

module.exports = filterFiles
