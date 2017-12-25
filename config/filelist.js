const path = require('path')

const root = process.cwd()

const srcDir = path.join(root, 'src')

// TODO: replase with reading from firebase.config.js
const firebaseFunctionDir = 'functions'

// TODO: optional consideration of reading file structure from elsewhere
const input = {
  index: path.join(srcDir, 'server.index.js'),
  shared: path.join(srcDir, 'shared'),
  server: path.join(srcDir, 'server'),
}

const outIndex = path.join(root, firebaseFunctionDir, 'index.js')

module.exports = {
  srcDir,
  firebaseFunctionDir,
  input,
  root,
  outIndex,
}
