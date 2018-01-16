const getServerIndexFilaname = require('../../config/getServerIndexFilaname')

describe('getServerIndexFilaname', () => {
  /* eslint-disable global-require */
  beforeEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
    process.argv = []
    jest.mock('../../scripts/utils/getPropFromJSONFile', () => () => null)
  })

  it('from cli arg', () => {
    process.argv = ['', '', '--srv=otherFile.js']
    const getServerIndexFilanameWMocks = require('../../config/getServerIndexFilaname')
    expect(getServerIndexFilanameWMocks()).toEqual('otherFile.js')
  })

  it('from .crafirebaserc.json', () => {
    jest.mock('../../scripts/utils/getPropFromJSONFile', () => (file, prop) => {
      if (file.indexOf('.crafirebaserc.json') > 0 && prop === 'index') {
        return 'someCool.file.js'
      }
      return null
    })
    const getServerIndexFilanameWMocks = require('../../config/getServerIndexFilaname')
    expect(getServerIndexFilanameWMocks()).toEqual('someCool.file.js')
  })

  it('from package.json', () => {
    jest.mock('../../scripts/utils/getPropFromJSONFile', () => (file, prop) => {
      if (file.indexOf('package.json') > 0 && prop === 'crafirebase') {
        return {
          index: 'yetMore.wierdName.any',
        }
      }
      return null
    })
    const getServerIndexFilanameWMocks = require('../../config/getServerIndexFilaname')
    expect(getServerIndexFilanameWMocks()).toEqual('yetMore.wierdName.any')
  })

  it('default value', () => {
    expect(getServerIndexFilaname()).toEqual('server.index.js')
  })
  /* eslint-enable global-require */
})
