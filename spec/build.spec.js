describe('build script', () => {
  /* eslint-disable no-console */
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    jest.mock('../config/filelist')
    jest.mock('../scripts/utils/processFiles', () => () => [])
    jest.mock('../scripts/callReactScriptsBuild', () => jest.fn())
    jest.mock('../scripts/copyMarkup', () => () => true)
    console.error = jest.fn()
    console.log = jest.fn()
    console.info = jest.fn()
  })

  it('run with mocks', () => {
    // eslint-disable-next-line global-require
    const build = require('../scripts/build')

    return build().then(() => {
      expect(console.error).toHaveBeenCalledTimes(0)
      expect(console.log).toHaveBeenCalledTimes(1)
      expect(console.info).toHaveBeenCalledTimes(3)
    })
  })
  /* eslint-enable no-console */
})
