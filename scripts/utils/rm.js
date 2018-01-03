const { join } = require('path')
const { removeSync } = require('fs-extra')

const outputName = require('./outputName')

const {
  root, input, srcDir, firebaseFunctionsDir, outIndex,
} = require('../../config/filelist')

const names = [
  join(root, 'build'),
  outIndex,
  join(root, firebaseFunctionsDir, 'markup.js'),
  ...Object.keys(input).map(el => outputName(input[el], srcDir, firebaseFunctionsDir)),
]

const rm = () => Promise.resolve(names.map(p => removeSync(p)))

module.exports = rm
