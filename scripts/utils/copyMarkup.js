// eslint-disable-next-line import/no-extraneous-dependencies
const { readFile, writeFile } = require('fs-extra')
const { join } = require('path')
const { root, firebaseFunctionsDir, craBuildIndex } = require('../../config/filelist')

const outputFile = join(root, firebaseFunctionsDir, 'markup.js')
const searchCriteria = /<div.*id=("|')root("|').*>(.|\n)*<\/div>/i

const expressFunction = markup => `module.exports = (content, additional = null) => {
  let more = ''
  if (additional) {
    more = \`< script charset = "UTF-8" >
    \${Object.keys(additional).reduce((acc, key) => \`\${acc}\\n\${key}=\${JSON.stringify(additional[key])};\`, '')}
    </script >\`
  }
  return \`${markup}\`
}`

const copyMarkup = () =>
  readFile(craBuildIndex, 'utf-8')
    .then((content) => {
      const searchResult = content.match(searchCriteria)

      if (!Array.isArray(searchResult)) {
        const err = new Error(`no string matching ${searchCriteria}`)
        return Promise.reject(err)
      }
      const rootDiv = searchResult[0].substring(0, searchResult[0].indexOf('</div>') + 6)
      // eslint-disable-next-line no-template-curly-in-string
      const replacement = `${rootDiv.replace('><', '>${content}<')}\${more}`
      const newMarkup = content.replace(rootDiv, replacement)
      return expressFunction(newMarkup)
    })
    .then(markup => writeFile(outputFile, markup, 'utf-8'))
    .catch(error => Promise.reject(error))

module.exports = copyMarkup
