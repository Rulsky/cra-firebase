const readFilenamesMock = require('../../scripts/utils/__mocks__/readFilenames')

describe('processFiles', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    jest.mock('../../config/filelist.js')
  })

  it('applies functions as expected', () => {
    // eslint-disable-next-line global-require
    const processFiles = require('../../scripts/utils/processFiles')
    const filterFilesMock = jest.fn(name => name.substr(-3) === '.js' && name.substr(-7) !== 'test.js')
    const transformMock = jest.fn()

    expect.assertions(3)

    return processFiles(readFilenamesMock, filterFilesMock, transformMock).then(() => {
      expect(readFilenamesMock).toHaveBeenCalledTimes(3)
      expect(filterFilesMock).toHaveBeenCalledTimes(8)
      expect(transformMock).toHaveBeenCalledTimes(4)
    })
  })
})
