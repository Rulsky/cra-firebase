const { sep, join, extname } = require('path')

const { root } = require('../../config/filelist')

const outputName = (filename, currDir, destDir) => {
  const relName = filename.split(`${currDir}${sep}`)[1]
  const ext = extname(relName)
  const renamed = `${relName.substr(0, relName.length - ext.length)}.js`
  return join(root, destDir, renamed)
}

module.exports = outputName
