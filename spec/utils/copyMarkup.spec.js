describe('copyMarkup', () => {
  /* eslint-disable no-underscore-dangle, global-require */
  const craBuildIndex = 'build/index.html'
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

  beforeEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
    jest.mock('../../config/filelist')
  })

  it('write a file with exported function', () => {
    require('fs-extra').__setFilesManifest(mockFileManifest)
    const copyMarkup = require('../../scripts/utils/copyMarkup')
    expect.assertions(4)
    return copyMarkup().then((actual) => {
      expect(actual.content).toMatch(/module.exports = \(content, scriptsGlabals = null, headNodes = null\) => {/)
      expect(actual.content).toMatch(/<html.*>/)
      expect(actual.content).toMatch(/<\/html>/)
      expect(actual.content).toMatch(/\${content}/)
    })
  })

  it('contains logic for injection additional global values', () => {
    require('fs-extra').__setFilesManifest(mockFileManifest)
    const copyMarkup = require('../../scripts/utils/copyMarkup')
    expect.assertions(4)
    return copyMarkup().then((actual) => {
      expect(actual.content).toMatch(/let more = ''/)
      expect(actual.content).toMatch(/if \(scriptsGlabals\) {/)
      expect(actual.content).toMatch(/more = `<script charset="UTF-8">/)
      expect(actual.content).toMatch(/<\/script>`/)
    })
  })

  it('contains logic for injecting more nodes into head', () => {
    require('fs-extra').__setFilesManifest(mockFileManifest)
    const copyMarkup = require('../../scripts/utils/copyMarkup')
    expect.assertions(2)
    return copyMarkup().then((actual) => {
      expect(actual.content).toMatch(/headNodes = null\) => {/)
      expect(actual.content).toMatch(/\${headNodes \|\| ''}<\/head>/)
    })
  })

  it("should produce an error if root element hasn't being found", () => {
    const emptyMockFileManifest = {
      [craBuildIndex]: 'nothing here',
    }

    require('fs-extra').__setFilesManifest(emptyMockFileManifest)
    const copyMarkup = require('../../scripts/utils/copyMarkup')

    expect.assertions(1)
    return copyMarkup().catch((actual) => {
      expect(actual.message).toMatch('no string matching')
    })
  })

  it("should produce an error if index.html wasn't found")
})
