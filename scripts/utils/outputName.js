const path = require('path')

const { root } = require('../../config/filelist')

const outputName = (filename, currDir, destDir) => {
  const relName = filename.split(`${currDir}${path.sep}`)[1]
  return path.join(root, destDir, relName)
}

module.exports = outputName
