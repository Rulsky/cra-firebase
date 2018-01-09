const { readJsonSync } = require('fs-extra')
const { join } = require('path')

const ft = {
  included: ['.js', '.jsx', '.svg'],
  excluded: ['spec.js', 'test.js'],
}

const addFiletypes = (conf) => {
  if (conf.include) {
    conf.include.forEach(el => ft.included.push(el))
  }
  if (conf.exclude) {
    conf.exclude.forEach(el => ft.excluded.push(el))
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

  const cliArgs = process.argv.slice(2)
  if (cliArgs.length > 0) {
    const cliParams = {
      included: '--include=',
      excluded: '--exclude=',
    }

    Object.keys(cliParams).forEach((param) => {
      const arg = cliArgs.find(el => el.startsWith(cliParams[param]))
      if (arg) {
        arg
          .split(cliParams[param])[1]
          .split(',')
          .forEach((pr) => {
            ft[param].push(pr)
          })
      }
    })
  }

  const includedResults = ft.included.map(ftype => filename.substr(-ftype.length) === ftype)
  const excludedResults = ft.excluded.map(ftype => filename.substr(-ftype.length) !== ftype)
  return includedResults.includes(true) && !excludedResults.includes(false)
}

module.exports = filterFiles
