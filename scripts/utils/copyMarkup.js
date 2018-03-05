const { readFile, writeFile } = require('fs-extra')
const { join } = require('path')
const { root, firebaseFunctionsDir, craBuildIndex } = require('../../config/filelist')

const outputFile = join(root, firebaseFunctionsDir, 'markup.js')
const rootDivSearchCriteria = /<div.*id=("|')root("|').*>(.|\n)*<\/div>/i

const expressFunction = markup => `module.exports = (content, scriptsGlabals = null, headNodes = null) => {
  let more = ''
  if (scriptsGlabals) {
    more = \`<script charset="UTF-8">
    \${Object.keys(scriptsGlabals).reduce((acc, key) => \`\${acc}\\n\${key}=\${JSON.stringify(scriptsGlabals[key])};\`, '')}
    </script>\`
  }
  return \`${markup}\`
}`

const copyMarkup = () =>
  readFile(craBuildIndex, 'utf-8')
    .then((content) => {
      const divSearchResult = content.match(rootDivSearchCriteria)
      if (!Array.isArray(divSearchResult)) {
        const err = new Error(`no string matching ${rootDivSearchCriteria}`)
        return Promise.reject(err)
      }
      const rootDiv = divSearchResult[0].substring(0, divSearchResult[0].indexOf('</div>') + 6)
      /* eslint-disable no-template-curly-in-string */
      const rootReplacement = `${rootDiv.replace('><', '>${content}<')}\${more}`
      const newMarkup = content.replace(rootDiv, rootReplacement).replace('</head>', '${headNodes || \'\'}</head>')
      return expressFunction(newMarkup)
    })
    .then(markup => writeFile(outputFile, markup, 'utf-8'))
    .catch(error => Promise.reject(error))

module.exports = copyMarkup
