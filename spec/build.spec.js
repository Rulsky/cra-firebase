describe('build script', () => {
  /* eslint-disable no-console */
  const rmMock = jest.fn(() => Promise.resolve())
  const processFilesMock = jest.fn(() => Promise.resolve())
  const callReactScriptsBuildMock = jest.fn()
  const copyMarkupMock = jest.fn(() => Promise.resolve())

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    jest.mock('../config/filelist')
    jest.mock('../scripts/utils/processFiles', () => () => [])
    jest.mock('../scripts/utils/callReactScriptsBuild', () => jest.fn())
    jest.mock('../scripts/copyMarkup', () => () => true)
    console.error = jest.fn()
    console.log = jest.fn()
    console.info = jest.fn()
  })

  it('runs functions involved in build process', () => {
    // eslint-disable-next-line global-require
    const build = require('../scripts/build')

    expect.assertions(7)
    return build(rmMock, processFilesMock, callReactScriptsBuildMock, copyMarkupMock).then(() => {
      expect(console.error).toHaveBeenCalledTimes(0)
      expect(console.log).toHaveBeenCalledTimes(1)
      expect(console.info).toHaveBeenCalledTimes(5)
      expect(rmMock).toHaveBeenCalledTimes(1)
      expect(processFilesMock).toHaveBeenCalledTimes(1)
      expect(callReactScriptsBuildMock).toHaveBeenCalledTimes(1)
      expect(copyMarkupMock).toHaveBeenCalledTimes(1)
    })
  })

  it('sets BABEL_ENV as it was before run', () => {
    // eslint-disable-next-line global-require
    const build = require('../scripts/build')

    const testExample = 'jibberish'
    process.env.BABEL_ENV = testExample
    expect.assertions(1)
    return build().then(() => {
      expect(process.env.BABEL_ENV).toBe(testExample)
    })
  })
  /* eslint-enable no-console */
})
