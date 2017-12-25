const path = require('path')
const fs = require('fs')

const readFilenames = (dir, filelist = []) => {
  if (fs.statSync(dir).isFile()) {
    filelist.push(dir)
    return filelist
  }
  fs.readdirSync(dir).forEach((file) => {
    // eslint-disable-next-line no-param-reassign
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? readFilenames(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file))
  })
  return filelist
}

module.exports = readFilenames
