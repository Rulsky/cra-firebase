import flattenArray from '../../scripts/utils/flattenArray'

describe('convert multi-dimensional arrays into mono-dimentional', () => {
  it('should work multiple levels deep', () => {
    const given = [
      '0-zero',
      '0-one',
      '0-two',
      3,
      4,
      5,
      ['1-zero', '1-one', '1-two', '1-three', ['2-zero', '2-one']],
      { prop: 'obj1' },
      { prop: 'obj2' },
    ]
    const expected = [
      '0-zero',
      '0-one',
      '0-two',
      3,
      4,
      5,
      '1-zero',
      '1-one',
      '1-two',
      '1-three',
      '2-zero',
      '2-one',
      { prop: 'obj1' },
      { prop: 'obj2' },
    ]
    expect(flattenArray(given)).toEqual(expected)
  })

  it('second example to be shure that result is not hardcoded', () => {
    const given = ['zero', null, undefined, 'three', [12312, 5465, 5645, 560756]]
    const expected = ['zero', null, undefined, 'three', 12312, 5465, 5645, 560756]
    expect(flattenArray(given)).toEqual(expected)
  })

  it('works with flat array', () => {
    const flat = [
      1,
      343,
      54069,
      'sjdjfhosd',
      '39gfbe',
      null,
      undefined,
      {
        prop1: () => {},
        prop2: [],
        prop3: 'str',
      },
    ]
    expect(flattenArray(flat)).toEqual(flat)
  })
})
