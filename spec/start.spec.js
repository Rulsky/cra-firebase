const { EventEmitter } = require('events')
const { join } = require('path')


describe('start script', () => {
  /* eslint-disable global-require, no-console, no-underscore-dangle */
  beforeEach(() => {
    // jest.resetAllMocks()
    // jest.resetModules()
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
  it('should notify about changes', () => {
    console.info = jest.fn()
    const start = require('../scripts/start')
    const change = new EventEmitter()
    start()
    change.emit('add')
    change.emit('change')
    expect(console.info).toHaveBeenCalledTimes(1)
  })
  it('sets BABEL_ENV to development', () => {
    const start = require('../scripts/start')
    expect.assertions(1)
    start(undefined, true)
    expect(process.env.BABEL_ENV).toEqual('development')
    // return start().then(() => {
    //   expect(process.env.BABEL_ENV).toEqual('development')
    // })
  })
  describe('transformation', () => {
    let tfMock
    beforeEach(() => {
      tfMock = jest.fn()
    })
    it('calls transformation upon file change', () => {
      expect(tfMock).toHaveBeenCalledTimes(1)
    })
    it('calls transformation upon new file created', () => {
      expect(tfMock).toHaveBeenCalledTimes(1)
    })
    it('not called upon ignored files', () => {
      expect(tfMock).toHaveBeenCalledTimes(0)
    })
    it('should remove file from destination if original was removed')
  })
})
