/**
 * most of code burrowed from here with small tweaks:
 * https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/bin/react-scripts.js
 */

/* eslint-disable no-console */
const launch = (spawn, resolver) => {
  const args = process.argv.slice(2)
  const scriptIndex = args.findIndex(x => x === 'build' || x === 'start')
  const script = scriptIndex === -1 ? args[0] : args[scriptIndex]
  const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : []

  switch (script) {
    case 'version':
    case 'init':
    case 'build':
    case 'start': {
      try {
        const resolvedPath = resolver(`./scripts/${script}.js`)
        const allArgs = [
          ...nodeArgs,
          '-e',
          `${'require("'}${resolvedPath}")()`,
          script,
          ...args.slice(scriptIndex + 1),
        ]
        const result = spawn.sync('node', allArgs, { stdio: 'inherit' })
        if (result.signal) {
          if (result.signal === 'SIGKILL') {
            console.log(`The script ${script} failed because the process exited too early. ` +
                'This probably means the system ran out of memory or someone called ' +
                '`kill -9` on the process.')
          } else if (result.signal === 'SIGTERM') {
            console.log(`The script ${script} failed because the process exited too early. ` +
                'Someone might have called `kill` or `killall`, or the system could ' +
                'be shutting down.')
          }
          process.exit(1)
        }
        process.exit(result.status)
      } catch (error) {
        console.error('Error while executign script', error.message)
      }
      break
    }

    default:
      console.error(`Unknown script "${script}".`)
      break
  }
}
/* eslint-enable no-console */

module.exports = launch
