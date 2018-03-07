const { join } = require('path')
const filterFiles = require('../../scripts/utils/filterFiles')

describe('filterFiles', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
    jest.mock('../../config/filelist')
    process.argv = []
    jest.mock('../../scripts/utils/getPropFromJSONFile', () => () => null)
  })

  const given = [
    join(__dirname, 'app.jsx'),
    join(__dirname, 'app.spec.js'),
    join(__dirname, 'app.test.js'),
    join(__dirname, 'app-test.js'),
    join(__dirname, 'app.css'),
    join(__dirname, 'components', 'button.jsx'),
    join(__dirname, 'components', 'button.spec.js'),
    join(__dirname, 'components', 'button.test.js'),
    join(__dirname, 'components', 'button-test.js'),
    join(__dirname, 'components', 'button.css'),
    join(__dirname, 'containers', 'user.js'),
    join(__dirname, 'containers', 'dashboard.js'),
    join(__dirname, 'icons', 'ico.svg'),
    join(__dirname, 'icons', 'logo.svg'),
  ]

  const expected = [
    join(__dirname, 'app.jsx'),
    join(__dirname, 'components', 'button.jsx'),
    join(__dirname, 'containers', 'user.js'),
    join(__dirname, 'containers', 'dashboard.js'),
  ]

  it('default filtering', () => {
    const actual = given.filter(el => filterFiles(el))

    expect(actual).toEqual(expected)
  })

  /* eslint-disable global-require */
  it('reads more params from package.json cra-firebase', () => {
    jest.mock('../../scripts/utils/getPropFromJSONFile', () => (arg) => {
      if (arg.indexOf('package.json') > 0) {
        return {
          exclude: ['trash', 'txt.ts'],
          include: ['.ts', '.sh'],
        }
      }
      return null
    })
    const filterFilesWithMocks = require('../../scripts/utils/filterFiles')

    const newGiven = given.concat([
      join(__dirname, 'configs', 'mock.txt.ts'),
      join(__dirname, 'configs', 'mock.trash'),
      join(__dirname, 'logic', 'test.ts'),
      join(__dirname, 'scripts', 'build.sh'),
      join(__dirname, 'scripts', 'build.sh.trash'),
    ])

    const newExpected = expected.concat([
      join(__dirname, 'logic', 'test.ts'),
      join(__dirname, 'scripts', 'build.sh'),
    ])

    const actual = newGiven.filter(filterFilesWithMocks)
    expect(actual).toEqual(newExpected)
  })

  it('reads more params from .crafirebaserc.json', () => {
    jest.mock('../../scripts/utils/getPropFromJSONFile', () => (arg) => {
      if (arg.indexOf('.crafirebaserc.json') > 0) {
        return {
          exclude: ['trash', 'txt.ts'],
          include: ['.ts', '.sh'],
        }
      }
      return null
    })
    const filterFilesWithMocks = require('../../scripts/utils/filterFiles')

    const newGiven = given.concat([
      join(__dirname, 'configs', 'mock.txt.ts'),
      join(__dirname, 'configs', 'mock.trash'),
      join(__dirname, 'logic', 'test.ts'),
      join(__dirname, 'scripts', 'build.sh'),
      join(__dirname, 'scripts', 'build.sh.trash'),
    ])

    const newExpected = expected.concat([
      join(__dirname, 'logic', 'test.ts'),
      join(__dirname, 'scripts', 'build.sh'),
    ])

    const actual = newGiven.filter(filterFilesWithMocks)
    expect(actual).toEqual(newExpected)
  })

  it('reads more options from CLI', () => {
    process.argv = ['', '', '--exclude=.sh,.tmp', '--include=.txt,.ts']

    const newGiven = given.concat([
      join(__dirname, 'configs', 'mock.txt.ts'),
      join(__dirname, 'configs', 'mock.trash'),
      join(__dirname, 'logic', 'test.ts'),
      join(__dirname, 'scripts', 'build.sh'),
      join(__dirname, 'scripts', 'build.sh.trash'),
      join(__dirname, 'other.txt'),
      join(__dirname, 'some.tmp'),
    ])

    const newExpected = expected.concat([
      join(__dirname, 'configs', 'mock.txt.ts'),
      join(__dirname, 'logic', 'test.ts'),
      join(__dirname, 'other.txt'),
    ])

    const actual = newGiven.filter(filterFiles)
    expect(actual).toEqual(newExpected)
  })
})
