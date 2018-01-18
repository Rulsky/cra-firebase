const prompt = require('../../scripts/utils/prompt')

describe('prompt', () => {
  const given = {
    q: 'qu',
    d: 'somedefault',
    pattern: new RegExp(/[A-Z]w+/, 'i'),
    message: 'i must be a message',
  }
  const ptMock = {
    start: jest.fn(),
    get: jest.fn((params, callback) => callback(null, { qu: 'tadam' })),
  }

  it('calls the dependency properly', () => {
    expect.assertions(2)
    return prompt(given, ptMock).then(() => {
      expect(ptMock.start).toHaveBeenCalledTimes(1)
      expect(ptMock.get).toHaveBeenCalledTimes(1)
    })
  })

  it('fullfills with a string', () => {
    expect.assertions(1)
    return prompt(given, ptMock).then((res) => {
      expect(res).toEqual('tadam')
    })
  })

  it('rejects', () => {
    const ptErr = {
      start: jest.fn(),
      get: jest.fn((params, callback) => callback('i am an error', {})),
    }
    expect.assertions(1)
    return prompt(given, ptErr).catch((res) => {
      expect(res).toEqual('i am an error')
    })
  })
})
