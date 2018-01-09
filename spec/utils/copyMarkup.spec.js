describe('copyMarkup', () => {
  const craBuildIndex = 'build/index.html'

  beforeEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
    jest.mock('../../config/filelist')
  })

  it('write a file with exported function', () => {
    const mockFileManifest = {
      [craBuildIndex]: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
            <title>test markup</title>
            <link href="/static/css/main.mock.css" rel="stylesheet">
          </head>
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
            <script type="text/javascript" src="/static/js/summy.js"></script>
          </body>
        </html>`,
    }
    // eslint-disable-next-line no-underscore-dangle, global-require
    require('fs-extra').__setFilesManifest(mockFileManifest)
    // eslint-disable-next-line global-require
    const copyMarkup = require('../../scripts/utils/copyMarkup')

    expect.assertions(4)

    return copyMarkup().then((actual) => {
      expect(actual.content).toMatch(/module.exports = content => /)
      expect(actual.content).toMatch(/<html.*>/)
      expect(actual.content).toMatch(/<\/html>/)
      expect(actual.content).toMatch(/\${content}/)
    })
  })

  it("should produce an error if root element hasn't being found", () => {
    const mockFileManifest = {
      [craBuildIndex]: 'nothing here',
    }

    // eslint-disable-next-line no-underscore-dangle, global-require
    require('fs-extra').__setFilesManifest(mockFileManifest)
    // eslint-disable-next-line global-require
    const copyMarkup = require('../../scripts/utils/copyMarkup')

    expect.assertions(1)
    return copyMarkup().catch((actual) => {
      expect(actual.message).toMatch('no string matching')
    })
  })

  it("should produce an error if index.html wasn't found")
})
