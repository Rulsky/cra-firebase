const getPropFromJSONFile = require('../../scripts/utils/getPropFromJSONFile')

describe('getting the property from a json file', () => {
  it('returns null if no file', () => {
    const filename = ''
    expect(getPropFromJSONFile(filename)).toBeNull()
  })

  it('returns file content as js object if second argument has not being provided', () => {
    const filename = 'test.json'
    const expected = {
      prop1: 'bla-bla-bla',
      prop2: ['some', 'array'],
      prop3: 21429304,
    }
    const readFnMock = jest.fn(() =>
      JSON.stringify(
        {
          prop1: 'bla-bla-bla',
          prop2: ['some', 'array'],
          prop3: 21429304,
        },
        2,
      ))
    expect(getPropFromJSONFile(filename, null, readFnMock)).toEqual(expected)
    expect(readFnMock).toHaveBeenCalledTimes(1)
  })

  it('returns a property value if second argument is provided', () => {
    const filename = 'test.json'
    const expected = ['i', 'expect', 'this', 'array']
    const readFnMock = jest.fn(() =>
      JSON.stringify(
        {
          prop1: 'dooh-dooh',
          prop2: ['i', 'expect', 'this', 'array'],
          prop3: 40953,
        },
        2,
      ))
    expect(getPropFromJSONFile(filename, 'prop2', readFnMock)).toEqual(expected)
    expect(readFnMock).toHaveBeenCalledTimes(1)
  })

  it('missing property in a file', () => {
    const filename = 'any.json'
    const readFnMock = jest.fn(() =>
      JSON.stringify(
        {
          prop1: 'dooh-dooh',
          prop2: ['i', 'expect', 'this', 'array'],
          prop3: 40953,
        },
        2,
      ))
    expect(getPropFromJSONFile(filename, 'no', readFnMock)).toBeNull()
    expect(readFnMock).toHaveBeenCalledTimes(1)
  })
})
