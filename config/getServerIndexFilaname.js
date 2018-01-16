const { join } = require('path')
const { root } = require('./consts')
const getCliArgs = require('../scripts/utils/getCliArgs')
const getPropFromJSONFile = require('../scripts/utils/getPropFromJSONFile')

const getServerIndexFilaname = () => {
  const cArgs = getCliArgs('srv')
  if (cArgs) return cArgs.srv[0]

  const rc = getPropFromJSONFile(join(root, '.crafirebaserc.json'), 'index')
  if (rc) return rc

  const pack = getPropFromJSONFile(join(root, 'package.json'), 'crafirebase')
  if (pack && pack.index) return pack.index

  return 'server.index.js'
}

module.exports = getServerIndexFilaname
