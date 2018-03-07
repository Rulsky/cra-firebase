const { join } = require('path')
const { readFile, writeFile } = require('fs-extra')

const rootPackName = join(process.cwd(), 'package.json')

const updatePack = () =>
  readFile(rootPackName, 'utf-8')
    .then(pack => JSON.parse(pack))
    .then(conf => ({
      ...conf,
      ...{
        scripts: {
          ...conf.scripts,
          build: 'cra-firebase build',
          deploy: 'npm run build && firebase deploy',
          'fbs:watch': 'cra-firebase start',
          'fbs:start': 'firebase serve --only hosting,functions',
        },
      },
    }))
    .then(final => writeFile(rootPackName, JSON.stringify(final, null, 2)))

module.exports = updatePack
