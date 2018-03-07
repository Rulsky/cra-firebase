const { join } = require('path')

describe('detectYarn', () => {
  jest.mock('../../config/filelist')
  jest.mock('fs')
  /* eslint-disable global-require, no-underscore-dangle */
  it('returns true if yarn.lock is present', () => {
    const filename = join(process.cwd(), 'yarn.lock')
    require('fs').__setFilesManifest({
      [filename]: '',
    })
    const detectYarn = require('../../scripts/utils/detectYarn')
    expect(detectYarn()).toEqual(true)
  })
  it('returns false if no yarn.lock', () => {
    require('fs').__setFilesManifest({})
    const detectYarn = require('../../scripts/utils/detectYarn')
    expect(detectYarn()).toEqual(false)
  })
})
