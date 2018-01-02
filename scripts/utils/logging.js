const chalk = require('chalk')

const { log, error } = console

const okColor = [0, 194, 39]
const infoColor = [102, 198, 120]
const errorColor = [195, 27, 27]

const errOut = (message, err = null) => error(chalk.rgb(...errorColor).bold(message, err !== null ? err : ''))

const okOut = message => log(chalk.rgb(...okColor).inverse(message))

const infoOut = message => log(chalk.rgb(...infoColor).inverse(message))

module.exports = {
  errOut,
  okOut,
  infoOut,
}
