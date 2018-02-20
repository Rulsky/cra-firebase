const { join } = require('path')
const { readFile, writeFile } = require('fs-extra')
const { root, firebaseFunctionsDir } = require('../../config/filelist')

const copyDeps = () => {
  const functionsPackName = join(root, firebaseFunctionsDir, 'package.json')
  const rootPackName = join(root, 'package.json')

  return Promise.all([readFile(rootPackName, 'utf-8'), readFile(functionsPackName, 'utf-8')])
    .then(([rootPackJSON, funcPackJSON]) => {
      const rootPack = JSON.parse(rootPackJSON)
      const funcPack = JSON.parse(funcPackJSON)

      const nextPack = {
        ...funcPack,
        dependencies: {
          ...funcPack.dependencies,
          ...rootPack.dependencies,
        },
      }
      delete nextPack.dependencies['react-scripts']

      return JSON.stringify(nextPack, null, 2)
    })
    .then(finalPack => writeFile(functionsPackName, finalPack, 'utf-8'))
}

module.exports = copyDeps
