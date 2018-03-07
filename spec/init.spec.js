describe('init script', () => {
  const updatePackMock = jest.fn(() => Promise.resolve())
  const updateGitignore = jest.fn(() => Promise.resolve())
  const addRewrites = jest.fn(() => Promise.resolve())
  const seedSrcMock = jest.fn(() => Promise.resolve())
  const propmtMockY = jest.fn()
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
  /* eslint-disable global-require */
  describe('default behaviour with -y flag passed as cli arg', () => {
    beforeEach(() => {
      process.argv = ['', '', '-y']
    })

    it('runs updatePack, addsRewrites, updateGitignorea nd seedSrc', () => {
      const init = require('../scripts/init')
      expect.assertions(4)
      return init(
        updatePackMock, updateGitignore, addRewrites,
        loggingMock, propmtMockY, seedSrcMock,
      ).then(() => {
        expect(updatePackMock).toHaveBeenCalledTimes(1)
        expect(addRewrites).toHaveBeenCalledTimes(1)
        expect(updateGitignore).toHaveBeenCalledTimes(1)
        expect(seedSrcMock).toHaveBeenCalledTimes(1)
      })
    })

    it('informs about progress', () => {
      const init = require('../scripts/init')
      expect.assertions(2)
      return init(
        updatePackMock, updateGitignore, addRewrites,
        loggingMock, propmtMockY, seedSrcMock,
      ).then(() => {
        expect(loggingMock.okOut).toHaveBeenCalledTimes(1)
        expect(loggingMock.infoOut).toHaveBeenCalledTimes(4)
      })
    })

    it('informs about failure', () => {
      const init = require('../scripts/init')
      expect.assertions(1)
      const updatePackMockWithErr = jest.fn(() => () => Promise.reject(new Error()))
      return init(updatePackMockWithErr, updateGitignore, addRewrites, loggingMock).then(() => {
        expect(loggingMock.errOut).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('step-by-step with prompt', () => {
    beforeEach(() => {
      process.argv = ['', '']
    })

    it('yes to all', () => {
      const init = require('../scripts/init')
      const propmtMock = jest.fn()
      propmtMock
        .mockReturnValueOnce(Promise.resolve('yes'))
        .mockReturnValueOnce(Promise.resolve('Y'))
        .mockReturnValueOnce(Promise.resolve('YES'))
        .mockReturnValueOnce(Promise.resolve('y'))
        .mockReturnValueOnce(Promise.resolve('YeS'))
      expect.assertions(5)
      return init(
        updatePackMock,
        updateGitignore,
        addRewrites,
        loggingMock,
        propmtMock,
        seedSrcMock,
      ).then(() => {
        expect(updatePackMock).toHaveBeenCalledTimes(1)
        expect(addRewrites).toHaveBeenCalledTimes(1)
        expect(updateGitignore).toHaveBeenCalledTimes(1)
        expect(seedSrcMock).toHaveBeenCalledTimes(1)
        expect(loggingMock.infoOut).toHaveBeenCalledTimes(4)
      })
    })

    it('no to all', () => {
      const init = require('../scripts/init')
      const propmtMock = jest.fn()
      propmtMock
        .mockReturnValueOnce(Promise.resolve('No'))
        .mockReturnValueOnce(Promise.resolve('NO'))
        .mockReturnValueOnce(Promise.resolve('n'))
        .mockReturnValueOnce(Promise.resolve('N'))
        .mockReturnValueOnce(Promise.resolve('nO'))
      expect.assertions(5)
      return init(
        updatePackMock,
        updateGitignore,
        addRewrites,
        loggingMock,
        propmtMock,
        seedSrcMock,
      ).then(() => {
        expect(updatePackMock).toHaveBeenCalledTimes(0)
        expect(addRewrites).toHaveBeenCalledTimes(0)
        expect(updateGitignore).toHaveBeenCalledTimes(0)
        expect(seedSrcMock).toHaveBeenCalledTimes(0)
        expect(loggingMock.infoOut).toHaveBeenCalledTimes(4)
      })
    })

    it('informs about failure', () => {
      const init = require('../scripts/init')
      expect.assertions(1)
      const updatePackMockWithErr = jest.fn(() => () => Promise.reject(new Error()))
      const propmtMock = jest.fn(() => Promise.reject(new Error()))
      return init(
        updatePackMockWithErr,
        updateGitignore,
        addRewrites,
        loggingMock,
        propmtMock,
      ).then(() => {
        expect(loggingMock.errOut).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('test coverage tool satisfaction', () => {
    it('first', () => {
      const init = require('../scripts/init')
      expect(() => {
        init(null)
      }).toThrow()
    })
  })
})
