const { EventEmitter } = require('events')
const { join } = require('path')

describe('start script', () => {
  /* eslint-disable global-require, no-console  */
  beforeEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
    const filename = join(process.cwd(), 'firebase.json')
    require('fs-extra').__setFilesManifest({
      [filename]: JSON.stringify({
        hosting: {
          public: 'build',
          ignore: [
            'firebase.json',
            '**/.*',
            '**/node_modules/**',
          ],
          rewrites: [
            {
              source: '**',
              function: 'app',
            },
          ],
        },
      }, null, 2),
    })
  })
  it('should notify about changes')
  it('sets BABEL_ENV to development', () => {
    const start = require('../scripts/start')
    expect.assertions(1)
    start(undefined, true)
    expect(process.env.BABEL_ENV).toEqual('development')
  })
  describe('transformation', () => {
    it('calls transformation upon file change')
    it('calls transformation upon new file created')
    it('not called upon ignored files')
    it('should remove file from destination if original was removed')
  })
})
