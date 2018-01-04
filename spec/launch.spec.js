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
})

describe('unknown cli arguments', () => {
  it('should console.error if an unsupported cli argument was passed', () => {
    const arg = 'dooh'
    /* eslint-disable no-console */
    console.error = jest.fn()
    process.argv = ['node/instance', 'file', arg]

    launch()

    expect(console.error).toBeCalledWith(`Unknown script "${arg}".`)
    expect(console.error).toHaveBeenCalledTimes(1)
    /* eslint-enable no-console */
  })
})
