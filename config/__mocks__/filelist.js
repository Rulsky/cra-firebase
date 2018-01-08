const { join } = require('path')

const root = process.cwd()

const firebaseFunctionsDir = join(root, 'functions')
const srcDir = join(root, 'src')
const serverIndexInput = 'server.index.js'
const outIndex = join(root, firebaseFunctionsDir, 'index.js')
const craBuildIndex = 'build/index.html'

const input = {
  index: join(srcDir, serverIndexInput),
  shared: join(srcDir, 'shared'),
  server: join(srcDir, 'server'),
  // other: join(srcDir, 'other'),
}

module.exports = {
  srcDir,
  firebaseFunctionsDir,
  input,
  root,
  outIndex,
  craBuildIndex,
  serverIndexInput,
}
