const { join } = require('path')
const configureBabel = require('../../scripts/utils/configureBabel')

describe('configureBabel', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    process.argv = []
  })

  describe('CLI arguments', () => {
    it('--presets', () => {
      process.argv = ['', '', '--presets=preset-next,preset-ts']

      const expected = {
        babelrc: false,
        presets: [
          [
            'env',
            {
              targets: {
                node: '6.11.1',
              },
            },
          ],
          'react-app',
          'flow',
          'preset-next',
          'preset-ts',
        ],
        plugins: [],
      }

      expect(configureBabel()).toEqual(expected)
    })

    it('--plugins', () => {
      process.argv = ['', '', '--plugins=plugin-one,plugin-two']

      const expected = {
        babelrc: false,
        presets: [
          [
            'env',
            {
              targets: {
                node: '6.11.1',
              },
            },
          ],
          'react-app',
          'flow',
        ],
        plugins: ['plugin-one', 'plugin-two'],
      }

      expect(configureBabel()).toEqual(expected)
    })

    describe('"--presets" and "--plugins"', () => {
      const expected = {
        babelrc: false,
        presets: [
          [
            'env',
            {
              targets: {
                node: '6.11.1',
              },
            },
          ],
          'react-app',
          'flow',
          'preset-pr1',
          'preset-pr2',
          'preset3',
        ],
        plugins: ['plugin-pl1', 'plugin-pl2'],
      }

      it('first comes "--presets", then "--plugins"', () => {
        process.argv = [
          '',
          '',
          '--presets=preset-pr1,preset-pr2,preset3',
          '--plugins=plugin-pl1,plugin-pl2',
        ]

        expect(configureBabel()).toEqual(expected)
      })
      it('first comes "--plugins", then "--presets"', () => {
        process.argv = [
          '',
          '',
          '--plugins=plugin-pl1,plugin-pl2',
          '--presets=preset-pr1,preset-pr2,preset3',
        ]

        expect(configureBabel()).toEqual(expected)
      })
    })

    it('repeated values', () => {
      process.argv = ['', '', '--presets=preset-next,preset-ts,preset3,flow,react-app']
      const expected = {
        babelrc: false,
        presets: [
          [
            'env',
            {
              targets: {
                node: '6.11.1',
              },
            },
          ],
          'react-app',
          'flow',
          'preset-next',
          'preset-ts',
          'preset3',
        ],
        plugins: [],
      }
      expect(configureBabel()).toEqual(expected)
    })
  })
  /* eslint-disable no-underscore-dangle, global-require */
  describe('babelrc', () => {
    it('reads presets from babelrc file', () => {
      const mockFilename = join(process.cwd(), '.babelrc')
      const mockFileManifest = {
        [mockFilename]: JSON.stringify({
          presets: ['pres1', 'pr2', 'preset3'],
        }),
      }

      require('fs-extra').__setFilesManifest(mockFileManifest)
      const configureBabelwithMock = require('../../scripts/utils/configureBabel')

      const expected = {
        babelrc: false,
        presets: [
          [
            'env',
            {
              targets: {
                node: '6.11.1',
              },
            },
          ],
          'react-app',
          'flow',
          'pres1',
          'pr2',
          'preset3',
        ],
        plugins: [],
      }

      expect(configureBabelwithMock()).toEqual(expected)
    })
    it('reads plugins from babelrc file', () => {
      const mockFilename = join(process.cwd(), '.babelrc')
      const mockFileManifest = {
        [mockFilename]: JSON.stringify({
          plugins: ['plug1', 'pl2', 'plugin3'],
        }),
      }

      require('fs-extra').__setFilesManifest(mockFileManifest)
      const configureBabelwithMock = require('../../scripts/utils/configureBabel')

      const expected = {
        babelrc: false,
        presets: [
          [
            'env',
            {
              targets: {
                node: '6.11.1',
              },
            },
          ],
          'react-app',
          'flow',
        ],
        plugins: ['plug1', 'pl2', 'plugin3'],
      }

      expect(configureBabelwithMock()).toEqual(expected)
    })
    it('reads presets and plugins from babelrc file', () => {
      const mockFilename = join(process.cwd(), '.babelrc')
      const mockFileManifest = {
        [mockFilename]: JSON.stringify({
          presets: ['pres1', 'pr2', 'preset3'],
          plugins: ['plug1', 'pl2', 'plugin3'],
        }),
      }

      require('fs-extra').__setFilesManifest(mockFileManifest)
      const configureBabelwithMock = require('../../scripts/utils/configureBabel')

      const expected = {
        babelrc: false,
        presets: [
          [
            'env',
            {
              targets: {
                node: '6.11.1',
              },
            },
          ],
          'react-app',
          'flow',
          'pres1',
          'pr2',
          'preset3',
        ],
        plugins: ['plug1', 'pl2', 'plugin3'],
      }

      expect(configureBabelwithMock()).toEqual(expected)
    })
  })
  describe('reads config from "package.json" from prop "babel"', () => {
    it('reads presets', () => {
      const mockFilename = join(process.cwd(), 'package.json')
      const mockFileManifest = {
        [mockFilename]: JSON.stringify({
          babel: {
            presets: ['pres1', 'pr2', 'preset3'],
          },
        }),
      }

      require('fs-extra').__setFilesManifest(mockFileManifest)
      const configureBabelwithMock = require('../../scripts/utils/configureBabel')

      const expected = {
        babelrc: false,
        presets: [
          [
            'env',
            {
              targets: {
                node: '6.11.1',
              },
            },
          ],
          'react-app',
          'flow',
          'pres1',
          'pr2',
          'preset3',
        ],
        plugins: [],
      }

      expect(configureBabelwithMock()).toEqual(expected)
    })
    it('reads plugins', () => {
      const mockFilename = join(process.cwd(), 'package.json')
      const mockFileManifest = {
        [mockFilename]: JSON.stringify({
          babel: {
            plugins: ['plug1', 'pl2', 'plugin3'],
          },
        }),
      }

      require('fs-extra').__setFilesManifest(mockFileManifest)
      const configureBabelwithMock = require('../../scripts/utils/configureBabel')

      const expected = {
        babelrc: false,
        presets: [
          [
            'env',
            {
              targets: {
                node: '6.11.1',
              },
            },
          ],
          'react-app',
          'flow',
        ],
        plugins: ['plug1', 'pl2', 'plugin3'],
      }

      expect(configureBabelwithMock()).toEqual(expected)
    })
    it('reads presets and plugins', () => {
      const mockFilename = join(process.cwd(), 'package.json')
      const mockFileManifest = {
        [mockFilename]: JSON.stringify({
          babel: {
            presets: ['pres1', 'pr2', 'preset3'],
            plugins: ['plug1', 'pl2', 'plugin3'],
          },
        }),
      }

      require('fs-extra').__setFilesManifest(mockFileManifest)
      const configureBabelwithMock = require('../../scripts/utils/configureBabel')

      const expected = {
        babelrc: false,
        presets: [
          [
            'env',
            {
              targets: {
                node: '6.11.1',
              },
            },
          ],
          'react-app',
          'flow',
          'pres1',
          'pr2',
          'preset3',
        ],
        plugins: ['plug1', 'pl2', 'plugin3'],
      }

      expect(configureBabelwithMock()).toEqual(expected)
    })
  })

  it.skip('precedence when all source of configurations are present', () => {
    const mockPackageJson = join(process.cwd(), 'package.json')
    const mockBabelrc = join(process.cwd(), '.babelrc')
    const mockFileManifest = {
      [mockPackageJson]: JSON.stringify({
        babel: {
          presets: ['pres1', ['pr2', { someoption: { prop: 'dont' } }], 'preset3'],
          plugins: ['plug1', 'pl2', 'plugin3'],
        },
      }),
      [mockBabelrc]: JSON.stringify({
        presets: ['pres1', ['pr2', { someoption: { prop: 'val' } }], 'preset3'],
        plugins: ['plug1', 'pl2', 'plugin3'],
      }),
    }

    require('fs-extra').__setFilesManifest(mockFileManifest)
    const configureBabelwithMock = require('../../scripts/utils/configureBabel')

    const expected = {
      babelrc: false,
      presets: [
        [
          'env',
          {
            targets: {
              node: '6.11.1',
            },
          },
        ],
        'react-app',
        'flow',
        'pres1',
        ['pr2', { someoption: { prop: 'val' } }],
        'preset3',
      ],
      plugins: ['plug1', 'pl2', 'plugin3'],
    }

    expect(configureBabelwithMock()).toEqual(expected)
  })
  /* eslint-enable no-underscore-dangle, global-require */
})
