const { join } = require('path')

const root = process.cwd()

const srcDir = join(root, 'src')
const firebaseFunctionsDir = join(root, 'functions')

const input = {
  index: join(srcDir, 'server.index.js'),
  shared: join(srcDir, 'shared'),
  server: join(srcDir, 'server'),
  // other: join(srcDir, 'other'),
}

const outIndex = join(root, firebaseFunctionsDir, 'index.js')

module.exports = {
  srcDir,
  firebaseFunctionsDir,
  input,
  root,
  outIndex,
}
