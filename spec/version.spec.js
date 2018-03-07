const { join } = require('path')

describe('version script', () => {
  it('should return version number which listed is in pakcage.json', () => {
    const packName = join(process.cwd(), 'package.json')
    /* eslint-disable global-require, no-console */
    require('fs-extra').__setFilesManifest({
      [packName]: JSON.stringify({
        name: 'cra-firebase-mock',
        version: '1.2.5',
      }, null, 2),
    })
    console.info = jest.fn()
    const version = require('../scripts/version')
    expect.assertions(2)
    return version().then((actual) => {
      expect(actual).toEqual('version 1.2.5')
      expect(console.info).toHaveBeenCalledTimes(1)
    })
  })
})
