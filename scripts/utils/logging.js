const chalk = require('chalk')

const { log } = console

const okColor = [0, 194, 39]
const infoColor = [102, 198, 120]
const errorColor = [195, 27, 27]

const errOut = (message, error = null) => log(chalk.rgb(...errorColor).bold(message, error))

const okOut = message => log(chalk.rgb(...okColor).inverse(message))

const infoOut = message => log(chalk.rgb(...infoColor).inverse(message))

module.exports = {
  errOut,
  okOut,
  infoOut,
}
