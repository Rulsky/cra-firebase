import getCliArgs from '../../scripts/utils/getCliArgs'

describe('read values of given cli arguments', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
    process.argv = []
  })

  it('returns null if no arguments', () => {
    process.argv = ['node', 'file.js']
    expect(getCliArgs()).toBeNull()
  })

  describe('works with an array as an argument', () => {
    it('case one', () => {
      process.argv = ['', '', '--arg1=val11,val12', '--arg2=val21,val22,val23']
      const params = ['arg1', 'arg2']

      const expected = {
        arg1: ['val11', 'val12'],
        arg2: ['val21', 'val22', 'val23'],
      }
      expect(getCliArgs(params)).toEqual(expected)
    })

    it('case two', () => {
      process.argv = [
        '',
        '',
        '--presets=env,stage0,ts',
        '--plugins=flow,plug2',
        '--more:should,be,ignored',
      ]
      const params = ['presets', 'plugins']

      const expected = {
        presets: ['env', 'stage0', 'ts'],
        plugins: ['flow', 'plug2'],
      }
      expect(getCliArgs(params)).toEqual(expected)
    })

    it('case three', () => {
      process.argv = [
        '',
        '',
        '--presets=env,stage0,ts',
        '--plugins=flow,plug2',
        '--third=val31,val32,val33',
      ]
      const params = ['presets', 'plugins', 'third']

      const expected = {
        presets: ['env', 'stage0', 'ts'],
        plugins: ['flow', 'plug2'],
        third: ['val31', 'val32', 'val33'],
      }
      expect(getCliArgs(params)).toEqual(expected)
    })

    it('no matching', () => {
      process.argv = ['', '', '--arg1=will,skip,it', '-arg2=this,one,to']
      const params = ['other', 'things']

      expect(getCliArgs(params)).toBeNull()
    })
  })

  describe('works with a string as an argument', () => {
    it('case one', () => {
      process.argv = ['', '', '--myarg=must,parse,these', '-other=must,skip,it']

      const expected = {
        myarg: ['must', 'parse', 'these'],
      }

      expect(getCliArgs('myarg')).toEqual(expected)
    })

    it('no matching', () => {
      process.argv = ['', '', '-other=must,skip,it']
      expect(getCliArgs('myarg')).toBeNull()
    })
  })
})
