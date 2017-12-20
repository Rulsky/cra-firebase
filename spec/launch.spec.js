import path from 'path'
import launch from '../scripts/launch'

describe('known cli arguments', () => {
  const spawn = {
    sync: jest.fn(() => ({
      signal: null,
      status: 0,
    })),
  }

  beforeEach(() => {
    require.resolve = jest.fn(arg => `${arg}`)
    process.exit = jest.fn()
    process.argv = ['node/instance', 'file']
  })

  it('should accept "build"', () => {
    process.argv.push('build')

    // console.log('spawn.sync', jest.isMockFunction(spawn.sync))
    // console.log('process.exit', jest.isMockFunction(process.exit))
    // console.log('require.resolve', jest.isMockFunction(require.resolve))
    // console.log('require.resolve call', require.resolve('bla'))

    launch(spawn)

    expect(process.exit).toBeCalledWith(0)
    expect(process.exit).toHaveBeenCalledTimes(1)
    expect(spawn.sync).toHaveBeenCalledTimes(1)
    // expect(require.resolve).toHaveBeenCalledTimes(1)
    // expect(require.resolve).toBeCalledWith('')
  })

  it('should accept "start"', () => {
    process.argv.push('start')

    launch(spawn)

    expect(process.exit).toHaveBeenCalledWith(0)
    expect(process.exit).toHaveBeenCalledTimes(1)
  })

  it('should accept supported arguments and pass through any additional arguments', () => {
    const moduleName = 'start'
    const additionalArgs = ['--add-arg1', '--add-arg2']
    process.argv.push(moduleName, ...additionalArgs)

    launch(spawn)

    expect(spawn.sync).toBeCalledWith(
      'node',
      [path.resolve(__dirname, '..', 'scripts', `${moduleName}.js`), ...additionalArgs],
      { stdio: 'inherit' },
    )
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
