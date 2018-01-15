const { readFileSync } = require('fs')

const getPropFromJSONFile = (filename, prop, readFn = readFileSync) => {
  try {
    const fileCont = JSON.parse(readFn(filename))
    if (prop && fileCont[prop]) {
      return fileCont[prop]
    } else if (prop) {
      return null
    }
    return fileCont
  } catch (e) {
    return null
  }
}

module.exports = getPropFromJSONFile
