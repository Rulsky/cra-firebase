const path = require('path')

const fs = jest.genMockFromModule('fs')

let mockFiles = Object.create(null)
/* eslint-disable no-underscore-dangle */
const __setMockFiles = (newMockFiles) => {
  mockFiles = Object.create(null)

  Object.keys(newMockFiles).forEach((file) => {
    const dir = path.dirname(file)

    if (!mockFiles[dir]) {
      mockFiles[dir] = []
    }
    mockFiles[dir].push(path.basename(file))
  })
}

let filesManifest = Object.create(null)
const __setFilesManifest = (files) => {
  filesManifest = Object.create(null)

  Object.keys(files).forEach((file) => {
    filesManifest[file] = files[file]
  })
}

const existsSync = file => (!!Object.prototype.hasOwnProperty.call(filesManifest, file))

fs.__setFilesManifest = __setFilesManifest
fs.__setMockFiles = __setMockFiles
fs.existsSync = existsSync

module.exports = fs
