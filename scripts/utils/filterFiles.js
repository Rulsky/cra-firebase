const { readJsonSync } = require('fs-extra')
const { join } = require('path')

const included = ['.js', '.jsx', '.svg']
const excluded = ['spec.js', 'test.js']

const addFiletypes = (conf) => {
  if (conf.include) {
    conf.include.forEach(el => included.push(el))
  }
  if (conf.exclude) {
    conf.exclude.forEach(el => excluded.push(el))
  }
}

const filterFiles = (filename) => {
  let packageConf
  try {
    packageConf = JSON.parse(readJsonSync(join(process.cwd(), 'package.json'))).crafirebase
  } catch (e) {} // eslint-disable-line no-empty
  if (packageConf) {
    addFiletypes(packageConf)
  }

  let crafirebaserc
  try {
    crafirebaserc = JSON.parse(readJsonSync(join(process.cwd(), '.crafirebaserc.json'))).crafirebase
  } catch (e) {} // eslint-disable-line no-empty
  if (crafirebaserc) {
    addFiletypes(crafirebaserc)
  }

  const includedResults = included.map(ftype => filename.substr(-ftype.length) === ftype)
  const excludedResults = excluded.map(ftype => filename.substr(-ftype.length) !== ftype)
  return includedResults.includes(true) && !excludedResults.includes(false)
}

module.exports = filterFiles
