const { sep, join } = require('path')

const { root } = require('../../config/filelist')

const outputName = (filename, currDir, destDir) => {
  const relName = filename.split(`${currDir}${sep}`)[1]
  return join(root, destDir, relName)
}

module.exports = outputName
