const path = require('path')

const fsExtra = jest.genMockFromModule('fs-extra')

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

const __applySpy = (spy, func) => {
  fsExtra[spy] = func
}

const readFile = filename => Promise.resolve(filesManifest[filename])

const writeFile = (filename, content) => ({ filename, content })

const outputFile = (filename, content) => ({ filename, content })

const readJsonSync = file => filesManifest[file]

fsExtra.__applySpy = __applySpy
fsExtra.__setMockFiles = __setMockFiles
fsExtra.__setFilesManifest = __setFilesManifest
fsExtra.readFile = readFile
fsExtra.writeFile = writeFile
fsExtra.removeSync = () => true
fsExtra.outputFile = outputFile
fsExtra.readJsonSync = readJsonSync
/* eslint-enable no-underscore-dangle */
module.exports = fsExtra
