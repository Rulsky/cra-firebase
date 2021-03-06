const { join } = require('path')

describe('updatePack script', () => {
  /* eslint-disable global-require */
  it('replaces build command in package.json and adds more for convinience', () => {
    const packName = join(process.cwd(), 'package.json')
    require('fs-extra').__setFilesManifest({
      [packName]: JSON.stringify({
        name: 'test-app',
        version: '1.1.2',
        private: true,
        scripts: {
          start: 'react-scripts start',
          build: 'react-scripts build',
          test: 'react-scripts test --env=jsdom',
          eject: 'react-scripts eject',
        },
        dependencies: {
          react: '^16.2.0',
        },
        devDependencies: {
          'firebase-tools': '^3.16.0',
        },
      }),
    })
    const expectedContent = JSON.stringify(
      {
        name: 'test-app',
        version: '1.1.2',
        private: true,
        scripts: {
          start: 'react-scripts start',
          build: 'cra-firebase build',
          test: 'react-scripts test --env=jsdom',
          eject: 'react-scripts eject',
          deploy: 'npm run build && firebase deploy',
          'fbs:watch': 'cra-firebase start',
          'fbs:start': 'firebase serve --only hosting,functions',
        },
        dependencies: {
          react: '^16.2.0',
        },
        devDependencies: {
          'firebase-tools': '^3.16.0',
        },
      },
      null,
      2,
    )

    const updatePack = require('../../scripts/utils/updatePack')

    return updatePack().then((actual) => {
      expect(actual.filename).toEqual(packName)
      expect(actual.content).toEqual(expectedContent)
    })
  })
})
