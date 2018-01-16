const { join } = require('path')

const SRC = 'src'
const root = process.cwd()
const srcDir = join(root, SRC)

module.exports = {
  root,
  srcDir,
  SRC,
}
