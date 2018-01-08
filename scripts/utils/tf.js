const { transformFile } = require('babel-core')
const babelConf = require('../../config/babel.conf.js')

const tf = (file, babelOpts = babelConf) =>
  new Promise((resolve, reject) =>
    transformFile(file, babelOpts, (error, result) => {
      if (error) return reject(error)
      return resolve(result.code)
    }))

module.exports = tf
