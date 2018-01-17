describe('init script', () => {
  const updatePackMock = jest.fn(() => Promise.resolve())
  const updateGitignore = jest.fn(() => Promise.resolve())
  const addRewrites = jest.fn(() => Promise.resolve())
  const loggingMock = {
    okOut: jest.fn(),
    infoOut: jest.fn(),
    errOut: jest.fn(),
  }

  beforeEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
    jest.mock('../config/filelist')
  })

  it('runs updatePack and updateGitignore', () => {
    const init = require('../scripts/init') // eslint-disable-line global-require
    expect.assertions(3)
    return init(updatePackMock, updateGitignore, addRewrites, loggingMock).then(() => {
      expect(updatePackMock).toHaveBeenCalledTimes(1)
      expect(addRewrites).toHaveBeenCalledTimes(1)
      expect(updateGitignore).toHaveBeenCalledTimes(1)
    })
  })

  it('informs about progress', () => {
    const init = require('../scripts/init') // eslint-disable-line global-require
    expect.assertions(2)
    return init(updatePackMock, updateGitignore, addRewrites, loggingMock).then(() => {
      expect(loggingMock.okOut).toHaveBeenCalledTimes(1)
      expect(loggingMock.infoOut).toHaveBeenCalledTimes(3)
    })
  })

  it('informs about failure', () => {
    const init = require('../scripts/init') // eslint-disable-line global-require
    expect.assertions(1)
    const updatePackMockWithErr = jest.fn(() => () => Promise.reject(new Error()))
    return init(updatePackMockWithErr, updateGitignore, addRewrites, loggingMock).then(() => {
      expect(loggingMock.errOut).toHaveBeenCalledTimes(1)
    })
  })
})
