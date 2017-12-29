const { transformFile } = require('babel-core')
const babelOpts = require('../../config/babel.conf.js')

const tf = file =>
  new Promise((resolve, reject) =>
    transformFile(file, babelOpts, (error, result) => {
      if (error) reject(error)
      resolve(result.code)
    }))

module.exports = tf
