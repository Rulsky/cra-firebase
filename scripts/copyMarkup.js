// eslint-disable-next-line import/no-extraneous-dependencies
const { readFile, writeFile } = require('fs-extra')
const { join } = require('path')
const { root, firebaseFunctionsDir, craBuildIndex } = require('../config/filelist')

const outputFile = join(root, firebaseFunctionsDir, 'markup.js')
const searchCriteria = /<div.*id=("|')root("|').*>(.|\n)*<\/div>/i

const expressFunction = markup => `module.exports = content => \`${markup}\`\n`

const copyMarkup = () =>
  readFile(craBuildIndex, 'utf-8')
    .then((content) => {
      const searchResult = content.match(searchCriteria)

      if (!Array.isArray(searchResult)) {
        throw Error(`no string matching ${searchCriteria}`)
      }
      const openHtmlElem = searchResult[0].substring(0, searchResult[0].indexOf('</div>'))
      const replacement = `${openHtmlElem} \${content} `
      const newMarkup = content.replace(openHtmlElem, replacement)
      return expressFunction(newMarkup)
    })
    .then((markup) => {
      writeFile(outputFile, markup, 'utf-8')
    })
    .catch((error) => {
      console.log(error)
      error.type = 'MARKUP' // eslint-disable-line no-param-reassign
      return Promise.reject(error)
    })

module.exports = copyMarkup
