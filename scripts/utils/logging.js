const chalk = require('chalk')

const { log, error, info } = console

const okColor = [0, 194, 39]
const infoColor = [102, 198, 120]
const errorColor = [195, 27, 27]

const errOut = (message, err = null) =>
  error(chalk
    .rgb(...errorColor)
    .bold(
      message,
      err !== null
        ? `ERROR:\n${err.message}\n\nerrno${err.errno}\ncode: ${err.code}\nsyscall: ${err.syscall}\nstack: ${err.stack}\naddress: ${err.address}\npath: ${err.path}\n`
        : '',
    ))

const okOut = message => log(chalk.rgb(...okColor).inverse(message))

const infoOut = message => info(chalk.rgb(...infoColor).inverse(message))

module.exports = {
  errOut,
  okOut,
  infoOut,
}
