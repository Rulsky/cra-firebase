const { join } = require('path')

describe('producec correct absolute filename', () => {
  let outputName
  beforeEach(() => {
    jest.mock('../../config/filelist')

    // eslint-disable-next-line global-require
    outputName = require('../../scripts/utils/outputName')
  })

  it('case 1', () => {
    const currDir = join(process.cwd(), 'src')
    const destDir = 'lib'
    const inputName = join(currDir, 'testname.txt')
    const expected = join(process.cwd(), destDir, 'testname.js')

    expect(outputName(inputName, currDir, destDir)).toEqual(expected)
  })

  it('case 2', () => {
    const currDir = join(process.cwd(), 'test-test')
    const destDir = 'functions'
    const inputName = join(currDir, 'testname.txt')
    const expected = join(process.cwd(), destDir, 'testname.js')

    expect(outputName(inputName, currDir, destDir)).toEqual(expected)
  })
})
