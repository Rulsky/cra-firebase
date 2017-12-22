const { transformFile } = require('babel-core')
const babelOpts = require('../config/babel.conf')

const tf = file =>
  new Promise((resolve, reject) =>
    transformFile(file, babelOpts, (error, result) => {
      if (error) return reject(error)
      return resolve(result.code)
    }))

module.exports = tf
