import launch from '../scripts/launch'

describe('known cli arguments', () => {
  const spawn = {
    sync: jest.fn(() => ({
      signal: null,
      status: 0,
    })),
  }

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    require.resolve = jest.fn(arg => `${arg}`)
    process.exit = jest.fn()
    process.argv = ['node/instance', 'file']
  })

  it('should accept "init"', () => {
    const moduleName = 'init'
    process.argv.push(moduleName)

    launch(spawn, require.resolve)

    expect(process.exit).toHaveBeenCalledWith(0)
    expect(process.exit).toHaveBeenCalledTimes(1)
    expect(require.resolve).toHaveBeenCalledTimes(1)
    expect(require.resolve).toBeCalledWith(`./scripts/${moduleName}.js`)
  })

  it('should accept "build"', () => {
    const moduleName = 'build'
    process.argv.push(moduleName)

    launch(spawn, require.resolve)

    expect(process.exit).toBeCalledWith(0)
    expect(process.exit).toHaveBeenCalledTimes(1)
    expect(spawn.sync).toHaveBeenCalledTimes(1)
    expect(require.resolve).toHaveBeenCalledTimes(1)
    expect(require.resolve).toBeCalledWith(`./scripts/${moduleName}.js`)
  })

  it('should accept "start"', () => {
    const moduleName = 'start'
    process.argv.push(moduleName)

    launch(spawn, require.resolve)

    expect(process.exit).toHaveBeenCalledWith(0)
    expect(process.exit).toHaveBeenCalledTimes(1)
    expect(require.resolve).toHaveBeenCalledTimes(1)
    expect(require.resolve).toBeCalledWith(`./scripts/${moduleName}.js`)
  })

  it('should accept supported arguments and pass through any additional arguments', () => {
    const moduleName = 'start'
    const additionalArgs = ['--add-arg1', '--add-arg2']
    process.argv.push(moduleName, ...additionalArgs)

    launch(spawn, require.resolve)

    const expectedPath = [
      '-e',
      `require("./scripts/${moduleName}.js")()`,
      moduleName,
      ...additionalArgs,
    ]

    expect(spawn.sync).toHaveBeenCalledTimes(1)
    expect(spawn.sync).toBeCalledWith('node', expectedPath, { stdio: 'inherit' })
  })

  it('catching in known scripts', () => {
    const moduleName = 'build'
    console.error = jest.fn()
    process.argv = ['node/instance', 'file', moduleName]
    launch(spawn)

    expect(console.error).toHaveBeenCalledWith(
      'Error while executign script',
      'resolver is not a function',
    )
    expect(console.error).toHaveBeenCalledTimes(1)
  })
})

/* eslint-disable no-console */
describe('signals', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
    console.log = jest.fn()
    process.argv = ['node/instance', 'file', 'build']
  })

  it('SIGKILL', () => {
    const spawn = {
      sync: jest.fn(() => ({
        signal: 'SIGKILL',
        status: 0,
      })),
    }

    launch(spawn, require.resolve)
    expect(console.log).toHaveBeenCalledTimes(1)
  })

  it('SIGTERM', () => {
    const spawn = {
      sync: jest.fn(() => ({
        signal: 'SIGTERM',
        status: 0,
      })),
    }

    launch(spawn, require.resolve)
    expect(console.log).toHaveBeenCalledTimes(1)
  })
})

describe('unknown cli arguments', () => {
  it('should console.error if an unsupported cli argument was passed', () => {
    const arg = 'dooh'
    console.error = jest.fn()
    process.argv = ['node/instance', 'file', arg]

    launch()

    expect(console.error).toBeCalledWith(`Unknown script "${arg}".`)
    expect(console.error).toHaveBeenCalledTimes(1)
  })
})
/* eslint-enable no-console */
