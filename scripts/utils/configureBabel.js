const { join } = require('path')
const defaultBabelConf = require('../../config/babel.conf.js')
const getCliArgs = require('./getCliArgs')
const getPropFromJSONFile = require('./getPropFromJSONFile')

const configureBabel = () => {
  const params = {
    presets: new Set(defaultBabelConf.presets ? defaultBabelConf.presets : []),
    plugins: new Set(defaultBabelConf.plugins ? defaultBabelConf.plugins : []),
  }

  const addElemsToConfig = (obj) => {
    if (obj.presets) {
      obj.presets.forEach(el => params.presets.add(el))
    }
    if (obj.plugins) {
      obj.plugins.forEach(el => params.plugins.add(el))
    }
  }

  const packageBabel = getPropFromJSONFile(join(process.cwd(), 'package.json'), 'babel')
  if (packageBabel) {
    addElemsToConfig(packageBabel)
  }

  const babelrc = getPropFromJSONFile(join(process.cwd(), '.babelrc'))
  if (babelrc) {
    addElemsToConfig(babelrc)
  }

  const cArgs = getCliArgs(['presets', 'plugins'])
  if (cArgs) {
    Object.keys(cArgs).forEach(p => cArgs[p].forEach(ca => params[p].add(ca)))
  }

  return {
    ...defaultBabelConf,
    presets: [...params.presets],
    plugins: [...params.plugins],
  }
}

module.exports = configureBabel
