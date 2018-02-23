const { resolve } = require('path')
const { readFile } = require('fs-extra')

const { info } = console

const version = () =>
  readFile(resolve(__dirname, '..', 'package.json'))
    .then(cont => JSON.parse(cont))
    .then((p) => {
      const str = `version ${p.version}`
      info(str)
      return str
    })


module.exports = version
