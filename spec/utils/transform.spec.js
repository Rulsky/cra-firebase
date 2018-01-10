import { join, basename } from 'path'

describe('transform', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    // jest.resetModules()
    jest.mock('../../scripts/utils/tf', () => () => Promise.resolve(true))
    jest.mock('../../config/filelist.js')
  })
  /* eslint-disable global-require */
  it('outputs "serer.index.js" as "index.js"', () => {
    /* eslint-disable global-require */
    const transform = require('../../scripts/utils/transform')
    const givenFilename = join(process.cwd(), 'src', 'server.index.js')

    expect.assertions(1)

    return transform(givenFilename).then((res) => {
      expect(basename(res.filename)).toBe('index.js')
    })
  })

  it('preserves other filenames as is', () => {
    const transform = require('../../scripts/utils/transform')
    const givenFilename = join(process.cwd(), 'src', 'blablabla.js')

    expect.assertions(1)

    return transform(givenFilename).then((res) => {
      expect(basename(res.filename)).toBe('blablabla.js')
    })
  })

  it('will log out an error', () => {
    jest.mock('../../scripts/utils/tf', () => () => Promise.reject(new Error()))

    const transform = require('../../scripts/utils/transform')
    const errOut = jest.fn()

    expect.assertions(2)

    return transform(undefined, errOut).then(() => {
      expect(errOut).toHaveBeenCalledWith(expect.stringMatching('Path must be a string. Received undefined'))
      expect(errOut).toHaveBeenCalledTimes(1)
    })
  })
})
/* eslint-enable global-require */
