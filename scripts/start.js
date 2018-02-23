const chokidar = require('chokidar')
const chalk = require('chalk')
const { sep } = require('path')
const { removeSync } = require('fs-extra')

const { input, firebaseFunctionsDir, srcDir } = require('../config/filelist')
const outputName = require('./utils/outputName')
const getFilterFiles = require('./utils/getFilterFiles')
const transform = require('./utils/transform')
const { errOut } = require('./utils/logging')

const { info } = console
const fileColor = str => info(chalk.cyan(str))
const rmColor = str => info(chalk.magenta(str))

const { include, exclude } = getFilterFiles()
const watchList = [
  input.index,
  include.map(ext => `${input.shared}${sep}**${sep}*${ext}`),
  include.map(ext => `${input.server}${sep}**${sep}*${ext}`),
]

const watcher = chokidar.watch(
  watchList,
  { ignored: exclude.map(el => `**/*${el}`) },
)

const start = (wt = watcher) => {
  process.env.BABEL_ENV = 'development'
  wt
    .on('add', (path) => {
      fileColor(`File ${path} has been added`)
      transform(path)
    })
    .on('change', (path) => {
      fileColor(`File ${path} has been changed`)
      transform(path)
    })
    .on('unlink', (path) => {
      removeSync(outputName(path, srcDir, firebaseFunctionsDir))
      rmColor(`File ${path} has been removed`)
    })
    .on('error', error => errOut(`Watcher error: ${error}`))
    .on('ready', () => info(chalk.green('First run is complete.\nListening for changes...')))

  return wt
}
module.exports = start
