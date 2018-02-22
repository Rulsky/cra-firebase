const { join } = require('path')
const getCliArgs = require('./getCliArgs')
const getPropFromJSONFile = require('./getPropFromJSONFile')

const addFiletypes = (conf, acc) => {
  if (conf.include) {
    conf.include.forEach(el => acc.include.push(el))
  }
  if (conf.exclude) {
    conf.exclude.forEach(el => acc.exclude.push(el))
  }
  return acc
}

const getFilterFiles = () => {
  const ft = {
    include: ['.js', '.jsx'],
    exclude: ['spec.js', 'test.js'],
  }

  const packageConf = getPropFromJSONFile(join(process.cwd(), 'package.json'), 'crafirebase')
  if (packageConf) {
    addFiletypes(packageConf, ft)
  }

  const crafirebaserc = getPropFromJSONFile(join(process.cwd(), '.crafirebaserc.json'))
  if (crafirebaserc) {
    addFiletypes(crafirebaserc, ft)
  }

  const cliArgs = getCliArgs(['include', 'exclude'])
  if (cliArgs) {
    Object.keys(cliArgs).forEach(p => ft[p].push(...cliArgs[p]))
  }

  return ft
}

module.exports = getFilterFiles
