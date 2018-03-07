const { join } = require('path')
const { readJsonSync } = require('fs-extra')
const { root, srcDir } = require('./consts')
const getServerIndexFilaname = require('./getServerIndexFilaname')

const fbsConf = readJsonSync(join(root, 'firebase.json'))
const firebaseFunctionsDir = fbsConf.functions ? fbsConf.functions.source : 'functions'
const serverIndexInput = getServerIndexFilaname()
const outIndex = join(root, firebaseFunctionsDir, 'index.js')
const craBuildIndex = join(root, 'build/index.html')

// TODO: optional consideration of reading file structure from elsewhere
const input = {
  index: join(srcDir, serverIndexInput),
  shared: join(srcDir, 'shared'),
  server: join(srcDir, 'server'),
}

const seedDir = join(__dirname, '..', 'seed')

module.exports = {
  srcDir,
  firebaseFunctionsDir,
  input,
  root,
  outIndex,
  craBuildIndex,
  serverIndexInput,
  seedDir,
}
