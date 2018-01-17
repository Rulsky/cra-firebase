const updatePack = require('./utils/updatePack.js')
const updateGitignore = require('./utils/updateGitignore.js')
const addRewrites = require('./utils/addRewrites')
const logging = require('./utils/logging')

const init = (updP = updatePack, updG = updateGitignore, addR = addRewrites, l = logging) =>
  Promise.resolve(l.infoOut('Modifying package.json scripts build command'))
    .then(updP())
    .then(l.infoOut('Success\nAdding rewrite rule to firebase.json'))
    .then(addR())
    .then(l.infoOut('Success\nAdding new entries to .gitignore'))
    .then(updG())
    .then(l.okOut('Success\nFinish'))
    .catch(err => l.errOut(`${err.stack}`))

module.exports = init
