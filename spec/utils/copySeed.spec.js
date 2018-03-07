describe('copySeed', () => {
  /* eslint-disable global-require */
  beforeEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })

  jest.mock('../../config/filelist')
  it('copy files with seed code', () => {
    // mock fs-extra
    jest.mock('fs-extra')
    const cpMock = jest.fn(() => Promise.resolve(true))
    require('fs-extra').__applySpy('copy', cpMock)

    // mock runInstallPackages
    jest.mock('../../scripts/utils/runInstallPackages')
    const runInstallPackages = require('../../scripts/utils/runInstallPackages')
    runInstallPackages.mockImplementation(() => true)

    const copySeed = require('../../scripts/utils/copySeed')

    expect.assertions(3)
    return copySeed().then(() => {
      expect(cpMock).toHaveBeenCalledTimes(1)
      expect(runInstallPackages).toHaveBeenCalledTimes(1)
      expect(runInstallPackages)
        .toHaveBeenCalledWith(expect.any(Array))
    })
  })
  it('captures error and output it into console', () => {
    /* eslint-disable no-console */
    console.error = jest.fn()

    jest.mock('fs-extra')
    const cpMock = jest.fn(() => Promise.reject(new Error('Mock rejection of copy')))
    require('fs-extra').__applySpy('copy', cpMock)

    jest.mock('../../scripts/utils/runInstallPackages', () => () => Promise.reject(new Error('mocked rejection of install packs')))

    const copySeed = require('../../scripts/utils/copySeed')

    return copySeed().catch(() => {
      expect(console.error).toHaveBeenCalledTimes(1)
      expect(console.error).toHaveBeenCalledWith('foo')
    })
  })
})
