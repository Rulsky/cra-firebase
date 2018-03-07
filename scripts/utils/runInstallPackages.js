const detectYarn = require('./detectYarn')
const { sync } = require('cross-spawn')

const runInstallPackages = (packages) => {
  const manager = detectYarn() ? 'yarn' : 'npm'
  const command = detectYarn() ? 'add' : 'i -S'
  const result = sync(manager, [command, ...packages], { stdio: 'inherit', shell: true })
  if (result.signal) return Promise.reject(result)
  return Promise.resolve(result)
}

module.exports = runInstallPackages
