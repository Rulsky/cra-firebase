const updatePack = require('./utils/updatePack.js')
const updateGitignore = require('./utils/updateGitignore.js')
const logging = require('./utils/logging')

const init = (updP = updatePack, updG = updateGitignore, l = logging) =>
  Promise.resolve(l.infoOut('Modifying package.json scripts build command'))
    .then(updP())
    .then(l.infoOut('Success\nAdding new entries to .gitignore'))
    .then(updG())
    .then(l.okOut('Success\nFinish'))
    .catch(err => l.errOut(`${err.stack}`))

module.exports = init
