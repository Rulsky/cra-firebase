const { join } = require('path')
const { readJsonSync } = require('fs-extra')

const root = process.cwd()
const fbsConf = readJsonSync(join(root, 'firebase.json'))
const firebaseFunctionsDir = fbsConf.functions ? fbsConf.functions.source : 'functions'
const srcDir = join(root, 'src')
const serverIndexInput = 'server.index.js'
const outIndex = join(root, firebaseFunctionsDir, 'index.js')
const craBuildIndex = join(root, 'build/index.html')

// TODO: optional consideration of reading file structure from elsewhere
const input = {
  index: join(srcDir, serverIndexInput),
  shared: join(srcDir, 'shared'),
  server: join(srcDir, 'server'),
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
