const { join } = require('path')
const filterFiles = require('../../scripts/utils/filterFiles')

describe('filterFiles', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
    jest.mock('../../config/filelist')
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
    join(__dirname, 'icons', 'ico.svg'),
    join(__dirname, 'icons', 'logo.svg'),
  ]

  it('default filtering', () => {
    const actual = given.filter(el => filterFiles(el))

    expect(actual).toEqual(expected)
  })

  /* eslint-disable no-underscore-dangle, global-require */
  it('reads more params from package.json cra-firebase', () => {
    const packageName = join(process.cwd(), 'package.json')
    const fileMock = {
      [packageName]: JSON.stringify({
        crafirebase: {
          exclude: ['trash', 'txt.ts'],
          include: ['.ts', '.sh'],
        },
      }),
    }
    require('fs-extra').__setFilesManifest(fileMock)
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
    const filename = join(process.cwd(), '.crafirebaserc.json')
    const fileMock = {
      [filename]: JSON.stringify({
        crafirebase: {
          exclude: ['trash', 'txt.ts'],
          include: ['.ts', '.sh'],
        },
      }),
    }
    require('fs-extra').__setFilesManifest(fileMock)
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
  /* eslint-enable no-underscore-dangle, global-require */
})
