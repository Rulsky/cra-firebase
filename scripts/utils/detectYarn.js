const { existsSync } = require('fs')
const { join } = require('path')
const { root } = require('../../config/filelist')

const detectYarn = () => existsSync(join(root, 'yarn.lock'))

module.exports = detectYarn
