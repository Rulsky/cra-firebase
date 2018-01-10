const updatePack = require('./utils/updatePack.js')
const updateGitignore = require('./utils/updateGitignore.js')

const init = (updP = updatePack, updG = updateGitignore) => Promise.all([updP(), updG()])

module.exports = init
