describe('runInstallPackages', () => {
  /* eslint-disable global-require,  */
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

    return runInstallPackages(mockParams).then(() => {
      expect(sync).toHaveBeenCalledTimes(1)
      expect(sync).toHaveBeenCalledWith('npm', ['i -S', ...mockParams], { stdio: 'inherit', shell: true })
    })
  })
  it('calls spawn.sync with yarn add and modules', () => {
    jest.mock('../../scripts/utils/detectYarn', () => () => true)
    const sync = jest.fn(() => ({ signal: null }))
    require('cross-spawn').__applySpy('sync', sync)
    const mockParams = ['one', 'two', 'three', 'four']

    const runInstallPackages = require('../../scripts/utils/runInstallPackages')

    return runInstallPackages(mockParams).then(() => {
      expect(sync).toHaveBeenCalledTimes(1)
      expect(sync).toHaveBeenCalledWith('yarn', ['add', ...mockParams], { stdio: 'inherit', shell: true })
    })
  })
  it('rejects if spawn was with trouble', () => {
    jest.mock('../../scripts/utils/detectYarn', () => () => true)
    const sync = jest.fn(() => ({ signal: 'SIGTERM' }))
    require('cross-spawn').__applySpy('sync', sync)
    const mockParams = ['one', 'two', 'three', 'four']

    const runInstallPackages = require('../../scripts/utils/runInstallPackages')

    return runInstallPackages(mockParams).catch(() => {
      expect(sync).toHaveBeenCalledTimes(1)
    })
  })
})
