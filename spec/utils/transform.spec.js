const { join, basename } = require('path')

describe('transform', () => {
  beforeEach(() => {
    jest.mock('../../scripts/utils/tf', () => () => Promise.resolve(true))
    jest.mock('../../config/filelist.js')
  })

  it('outputs "serer.index.js" as "index.js"', () => {
    // eslint-disable-next-line global-require
    const transform = require('../../scripts/utils/transform')
    const givenFilename = join(process.cwd(), 'src', 'server.index.js')

    expect.assertions(1)

    return transform(givenFilename).then((res) => {
      expect(basename(res.filename)).toBe('index.js')
    })
  })

  it('preserves other filenames as is', () => {
    // eslint-disable-next-line global-require
    const transform = require('../../scripts/utils/transform')
    const givenFilename = join(process.cwd(), 'src', 'blablabla.js')

    expect.assertions(1)

    return transform(givenFilename).then((res) => {
      expect(basename(res.filename)).toBe('blablabla.js')
    })
  })
})
