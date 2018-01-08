const { readJsonSync } = require('fs-extra')
const { join } = require('path')
const defaultBabelConf = require('../../config/babel.conf.js')

const configureBabel = () => {
  const params = {
    presets: new Set(defaultBabelConf.presets ? defaultBabelConf.presets : []),
    plugins: new Set(defaultBabelConf.plugins ? defaultBabelConf.plugins : []),
  }

  const addElemsToConfig = (obj) => {
    if (obj.presets) {
      obj.presets.forEach((el) => {
        params.presets.add(el)
      })
    }

    if (obj.plugins) {
      obj.plugins.forEach((el) => {
        params.plugins.add(el)
      })
    }
  }

  let packageBabel
  try {
    packageBabel = JSON.parse(readJsonSync(join(process.cwd(), 'package.json'))).babel
  } catch (e) {} // eslint-disable-line no-empty
  if (packageBabel) {
    addElemsToConfig(packageBabel)
  }

  let babelrc
  try {
    babelrc = JSON.parse(readJsonSync(join(process.cwd(), '.babelrc')))
  } catch (e) {} // eslint-disable-line no-empty
  if (babelrc) {
    addElemsToConfig(babelrc)
  }

  const cliArgs = process.argv.slice(2)
  if (cliArgs.length > 0) {
    const cliParams = {
      presets: '--presets=',
      plugins: '--plugins=',
    }

    Object.keys(cliParams).forEach((param) => {
      const arg = cliArgs.find(el => el.startsWith(cliParams[param]))
      if (arg) {
        arg
          .split(cliParams[param])[1]
          .split(',')
          .forEach((pr) => {
            params[param].add(pr)
          })
      }
    })
  }

  return {
    ...defaultBabelConf,
    presets: [...params.presets],
    plugins: [...params.plugins],
  }
}

module.exports = configureBabel
