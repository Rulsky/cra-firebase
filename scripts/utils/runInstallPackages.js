const detectYarn = require('./detectYarn')
const { sync } = require('cross-spawn')

const runInstallPackages = (packages) => {
  const manager = detectYarn() ? 'yarn' : 'npm'
  const command = detectYarn() ? 'add' : 'i -S'
  return sync(manager, [command, ...packages])
}

module.exports = runInstallPackages
