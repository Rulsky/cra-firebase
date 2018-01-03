const tf = require('../../scripts/utils/tf')

describe('be a promisified wrapper around babel-core', () => {
  const env = process.env.BABEL_ENV
  beforeEach(() => {
    process.env.BABEL_ENV = 'test'
  })

  afterEach(() => {
    process.env.BABEL_ENV = env
  })

  it('succesfully fullfills', () => {
    expect.assertions(1)
    const exampleFile = require.resolve('../fixtures/example')
    return tf(exampleFile).then((code) => {
      expect(code).toBeTruthy()
    })
  })

  it('rejected if not existing file', () => {
    expect.assertions(2)
    const fakePath = '/not/existnig/file.js'
    return tf(fakePath).catch((reason) => {
      expect(reason.code).toBe('ENOENT')
      expect(reason.path).toBe(fakePath)
    })
  })
})
