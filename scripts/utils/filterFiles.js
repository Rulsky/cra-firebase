const { join } = require('path')
const getCliArgs = require('./getCliArgs')
const getPropFromJSONFile = require('./getPropFromJSONFile')

const ft = {
  include: ['.js', '.jsx', '.svg'],
  exclude: ['spec.js', 'test.js'],
}

const addFiletypes = (conf) => {
  if (conf.include) {
    conf.include.forEach(el => ft.include.push(el))
  }
  if (conf.exclude) {
    conf.exclude.forEach(el => ft.exclude.push(el))
  }
}

const filterFiles = (filename) => {
  const packageConf = getPropFromJSONFile(join(process.cwd(), 'package.json'), 'crafirebase')
  if (packageConf) {
    addFiletypes(packageConf)
  }

  const crafirebaserc = getPropFromJSONFile(join(process.cwd(), '.crafirebaserc.json'))
  if (crafirebaserc) {
    addFiletypes(crafirebaserc)
  }

  const cliArgs = getCliArgs(['include', 'exclude'])
  if (cliArgs) {
    Object.keys(cliArgs).forEach(p => ft[p].push(...cliArgs[p]))
  }

  const includedResults = ft.include.map(ftype => filename.substr(-ftype.length) === ftype)
  const excludedResults = ft.exclude.map(ftype => filename.substr(-ftype.length) !== ftype)
  return includedResults.includes(true) && !excludedResults.includes(false)
}

module.exports = filterFiles
