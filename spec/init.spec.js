describe('init script', () => {
  const updatePackMock = jest.fn(() => Promise.resolve())
  const updateGitignore = jest.fn(() => Promise.resolve())
  it('runs updatePack and updateGitignore', () => {
    jest.mock('../config/filelist')
    const init = require('../scripts/init') // eslint-disable-line global-require
    expect.assertions(2)
    return init(updatePackMock, updateGitignore).then(() => {
      expect(updatePackMock).toHaveBeenCalledTimes(1)
      expect(updateGitignore).toHaveBeenCalledTimes(1)
    })
  })
})
