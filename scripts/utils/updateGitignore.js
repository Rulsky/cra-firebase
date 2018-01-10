const { join } = require('path')
const { readFile, writeFile } = require('fs-extra')
const { firebaseFunctionsDir } = require('../../config/filelist')

const filename = join(process.cwd(), '.gitignore')
const payload = `
${firebaseFunctionsDir}/**
!${firebaseFunctionsDir}/package.json
`

const updateGitignore = () =>
  readFile(filename, 'utf-8')
    .then(cont => cont.concat(payload))
    .then(cont => writeFile(filename, cont, 'utf-8'))

module.exports = updateGitignore
