const { join } = require('path')
const { readJsonSync } = require('fs-extra')

const root = process.cwd()

const fbsConf = readJsonSync(join(root, 'firebase.json'))

const firebaseFunctionsDir = fbsConf.functions ? fbsConf.functions.source : 'functions'

const srcDir = join(root, 'src')

// TODO: optional consideration of reading file structure from elsewhere
const input = {
  index: join(srcDir, 'server.index.js'),
  shared: join(srcDir, 'shared'),
  server: join(srcDir, 'server'),
}

const outIndex = join(root, firebaseFunctionsDir, 'index.js')

module.exports = {
  srcDir,
  firebaseFunctionsDir,
  input,
  root,
  outIndex,
}
