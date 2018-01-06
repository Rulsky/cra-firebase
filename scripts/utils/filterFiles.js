const filterFiles = filename =>
  (filename.substr(-3) === '.js' ||
    filename.substr(-4) === '.jsx' ||
    filename.substr(-4) === '.svg') &&
  filename.substr(-7) !== 'spec.js' &&
  filename.substr(-7) !== 'test.js'

module.exports = filterFiles
