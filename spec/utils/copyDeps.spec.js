const { join } = require('path')

describe('copyDeps', () => {
  /* eslint-disable no-underscore-dangle, global-require */
  it("copies dependencies from root package.json into firebase's functions package.json", () => {
    jest.mock('../../config/filelist')
    const { firebaseFunctionsDir } = require('../../config/filelist')
    const rootPackName = join(process.cwd(), 'package.json')
    const functionsPackName = join(process.cwd(), firebaseFunctionsDir, 'package.json')
    const filesManifest = {
      [rootPackName]: JSON.stringify({
        name: 'cf-tests',
        version: '0.1.0',
        private: true,
        dependencies: {
          react: '^16',
          'react-dom': '^16',
          'react-scripts': 'latest',
          firebase: '^4.8.1',
          'firebase-functions': '^0.8.0',
        },
      }),
      [functionsPackName]: JSON.stringify({
        name: 'functions',
        description: 'Cloud Functions for Firebase',
        scripts: {
          serve: 'firebase serve --only functions',
          shell: 'firebase experimental:functions:shell',
          start: 'npm run shell',
          deploy: 'firebase deploy --only functions',
          logs: 'firebase functions:log',
        },
        dependencies: {
          'firebase-admin': '~5.4.2',
          'firebase-functions': '^0.7.1',
        },
        private: true,
      }),
    }
    require('fs-extra').__setFilesManifest(filesManifest)
    const copyDeps = require('../../scripts/utils/copyDeps')

    const expectedContent = JSON.stringify({
      name: 'functions',
      description: 'Cloud Functions for Firebase',
      scripts: {
        serve: 'firebase serve --only functions',
        shell: 'firebase experimental:functions:shell',
        start: 'npm run shell',
        deploy: 'firebase deploy --only functions',
        logs: 'firebase functions:log',
      },
      dependencies: {
        'firebase-admin': '~5.4.2',
        'firebase-functions': '^0.8.0',
        react: '^16',
        'react-dom': '^16',
        firebase: '^4.8.1',
      },
      private: true,
    }, null, 2)

    return copyDeps().then((actual) => {
      expect(actual.filename).toEqual(functionsPackName)
      expect(actual.content).toEqual(expectedContent)
    })
  })
  /* eslint-enable no-underscore-dangle, global-require */
})
