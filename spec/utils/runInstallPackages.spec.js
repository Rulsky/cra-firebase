describe('runInstallPackages', () => {
  /* eslint-disable global-require, no-underscore-dangle */
  beforeEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })

  jest.mock('cross-spawn')
  it('calls spawn.sync with npm i -S and modules', () => {
    jest.mock('../../scripts/utils/detectYarn', () => () => false)
    const sync = jest.fn(() => ({ signal: null }))
    require('cross-spawn').__applySpy('sync', sync)
    const mockParams = ['one', 'two', 'three', 'four']

    const runInstallPackages = require('../../scripts/utils/runInstallPackages')

    runInstallPackages(mockParams)
    expect(sync).toHaveBeenCalledTimes(1)
    expect(sync).toHaveBeenCalledWith('npm', ['i -S', ...mockParams])
  })
  it('calls spawn.sync with yarn add and modules', () => {
    jest.mock('../../scripts/utils/detectYarn', () => () => true)
    const sync = jest.fn(() => ({ signal: null }))
    require('cross-spawn').__applySpy('sync', sync)
    const mockParams = ['one', 'two', 'three', 'four']

    const runInstallPackages = require('../../scripts/utils/runInstallPackages')

    runInstallPackages(mockParams)
    expect(sync).toHaveBeenCalledTimes(1)
    expect(sync).toHaveBeenCalledWith('yarn', ['add', ...mockParams])
  })
})
