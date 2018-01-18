const { join } = require('path')

describe('addRewrites', () => {
  /* eslint-disable no-underscore-dangle, global-require, no-console */

  const protoGiven = {
    hosting: {
      public: 'build',
      ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
    },
  }
  const expectedRule = {
    source: '**',
    function: 'app',
  }
  const filename = join(process.cwd(), 'firebase.json')

  beforeEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
    console.info = jest.fn()
    console.error = jest.fn()
  })

  it('no rewrites prop in firebase.json', () => {
    const given = JSON.stringify(protoGiven, null, 2)
    const expected = JSON.stringify(
      {
        hosting: {
          ...protoGiven.hosting,
          rewrites: [expectedRule],
        },
      },
      null,
      2,
    )

    require('fs-extra').__setFilesManifest({
      [filename]: given,
    })
    const addRewrites = require('../../scripts/utils/addRewrites')
    expect.assertions(4)
    return addRewrites().then((actual) => {
      expect(actual.filename).toMatch(filename)
      expect(actual.content).toEqual(expected)
      expect(console.info).toHaveBeenCalledTimes(1)
      expect(console.info).toHaveBeenCalledWith(expect.stringMatching('No rewrite rules found. Adding default rule'))
    })
  })

  it('rewrites prop is present with source ** pointing to index.html', () => {
    const given = JSON.stringify(
      {
        hosting: {
          ...protoGiven.hosting,
          rewrites: [
            {
              source: '**',
              destination: '/index.html',
            },
          ],
        },
      },
      null,
      2,
    )
    const expected = JSON.stringify(
      {
        hosting: {
          ...protoGiven.hosting,
          rewrites: [expectedRule],
        },
      },
      null,
      2,
    )

    require('fs-extra').__setFilesManifest({
      [filename]: given,
    })
    const addRewrites = require('../../scripts/utils/addRewrites')

    expect.assertions(4)
    return addRewrites().then((actual) => {
      expect(actual.filename).toMatch(filename)
      expect(actual.content).toEqual(expected)
      expect(console.info).toHaveBeenCalledTimes(1)
      expect(console.info).toHaveBeenCalledWith(expect.stringContaining('Redefining "**" rewrite to point to app function'))
    })
  })

  it('multiple rewrites rules and also one with ** source to index.html', () => {
    const given = JSON.stringify(
      {
        hosting: {
          ...protoGiven.hosting,
          rewrites: [
            {
              source: '/somerounte2',
              destination: '/somefile2.html',
            },
            {
              source: '/otherroute3',
              destination: '/otherfile3.html',
            },
            {
              source: '**',
              destination: '/index.html',
            },
          ],
        },
      },
      null,
      2,
    )
    const expected = JSON.stringify(
      {
        hosting: {
          ...protoGiven.hosting,
          rewrites: [
            {
              source: '/somerounte2',
              destination: '/somefile2.html',
            },
            {
              source: '/otherroute3',
              destination: '/otherfile3.html',
            },
            expectedRule,
          ],
        },
      },
      null,
      2,
    )
    require('fs-extra').__setFilesManifest({
      [filename]: given,
    })
    const addRewrites = require('../../scripts/utils/addRewrites')

    expect.assertions(4)
    return addRewrites().then((actual) => {
      expect(actual.filename).toMatch(filename)
      expect(actual.content).toEqual(expected)
      expect(console.info).toHaveBeenCalledTimes(1)
      expect(console.info).toHaveBeenCalledWith(expect.stringContaining('Redefining "**" rewrite to point to app function'))
    })
  })

  it('rewrites prop is present, but with no ** source', () => {
    const given = JSON.stringify(
      {
        hosting: {
          ...protoGiven.hosting,
          rewrites: [
            {
              source: '/somerounte',
              destination: '/somefile.html',
            },
          ],
        },
      },
      null,
      2,
    )
    const expected = JSON.stringify(
      {
        hosting: {
          ...protoGiven.hosting,
          rewrites: [
            {
              source: '/somerounte',
              destination: '/somefile.html',
            },
            expectedRule,
          ],
        },
      },
      null,
      2,
    )
    require('fs-extra').__setFilesManifest({
      [filename]: given,
    })
    const addRewrites = require('../../scripts/utils/addRewrites')

    expect.assertions(4)
    return addRewrites().then((actual) => {
      expect(actual.filename).toMatch(filename)
      expect(actual.content).toEqual(expected)
      expect(console.info).toHaveBeenCalledTimes(1)
      expect(console.info).toHaveBeenCalledWith(expect.stringContaining('No rewrite ** rule found. Adding default rewrite rule.'))
    })
  })

  it('multiple rewrites rules, but with no ** source', () => {
    const given = JSON.stringify(
      {
        hosting: {
          ...protoGiven.hosting,
          rewrites: [
            {
              source: '/somerounte',
              destination: '/somefile.html',
            },
            {
              source: '/otherroute',
              destination: '/otherfile.html',
            },
          ],
        },
      },
      null,
      2,
    )
    const expected = JSON.stringify(
      {
        hosting: {
          ...protoGiven.hosting,
          rewrites: [
            {
              source: '/somerounte',
              destination: '/somefile.html',
            },
            {
              source: '/otherroute',
              destination: '/otherfile.html',
            },
            expectedRule,
          ],
        },
      },
      null,
      2,
    )
    require('fs-extra').__setFilesManifest({
      [filename]: given,
    })
    const addRewrites = require('../../scripts/utils/addRewrites')

    expect.assertions(4)
    return addRewrites().then((actual) => {
      expect(actual.filename).toMatch(filename)
      expect(actual.content).toEqual(expected)
      expect(console.info).toHaveBeenCalledTimes(1)
      expect(console.info).toHaveBeenCalledWith(expect.stringContaining('No rewrite ** rule found. Adding default rewrite rule.'))
    })
  })

  it('rewrites prop is present with source ** pointing to function app', () => {
    const given = JSON.stringify(
      {
        hosting: {
          ...protoGiven.hosting,
          rewrites: [
            {
              source: '**',
              function: 'app',
            },
          ],
        },
      },
      null,
      2,
    )
    require('fs-extra').__setFilesManifest({
      [filename]: given,
    })
    const addRewrites = require('../../scripts/utils/addRewrites')
    expect.assertions(3)
    return addRewrites().then((actual) => {
      expect(actual).toBeNull()
      expect(console.info).toHaveBeenCalledTimes(1)
      expect(console.info).toHaveBeenCalledWith(expect.stringContaining('correct rewrite rule is already present. Skipping.'))
    })
  })

  it('rewrites prop is present with source ** pointing to some other function', () => {
    const given = JSON.stringify(
      {
        hosting: {
          ...protoGiven.hosting,
          rewrites: [
            {
              source: '**',
              function: 'myCustomFunc',
            },
          ],
        },
      },
      null,
      2,
    )

    require('fs-extra').__setFilesManifest({
      [filename]: given,
    })
    const addRewrites = require('../../scripts/utils/addRewrites')
    expect.assertions(3)
    return addRewrites().then((actual) => {
      expect(actual).toBeNull()
      expect(console.error).toHaveBeenCalledTimes(1)
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining("In you firebase configuration '**' rewrite rule is alredy present"))
    })
  })

  it('rewrites prop is present with source ** pointing to some other file', () => {
    const givenFilename = '/other.html'
    const given = JSON.stringify(
      {
        hosting: {
          ...protoGiven.hosting,
          rewrites: [
            {
              source: '/someroute',
              function: 'somefunc',
            },
            {
              source: '**',
              destination: givenFilename,
            },
          ],
        },
      },
      null,
      2,
    )

    require('fs-extra').__setFilesManifest({
      [filename]: given,
    })
    const addRewrites = require('../../scripts/utils/addRewrites')
    expect.assertions(3)
    return addRewrites().then((actual) => {
      expect(actual).toBeNull()
      expect(console.error).toHaveBeenCalledTimes(1)
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining("In you firebase configuration '**' rewrite rule is alredy present and pointin to some custom file"))
    })
  })

  it('preserves other props', () => {
    const given = JSON.stringify(
      {
        functions: {
          source: 'another-folder',
        },
        hosting: {
          public: 'app',
          ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
          redirects: [
            {
              source: '/foo',
              destination: '/bar',
              type: 301,
            },
            {
              source: '/firebase/*',
              destination: 'https://www.firebase.com',
              type: 302,
            },
          ],
          rewrites: [
            {
              source: '/app/**',
              destination: '/app/index.html',
            },
            {
              source: '**',
              destination: '/index.html',
            },
          ],
          headers: [
            {
              source: '**/*.@(eot|otf|ttf|ttc|woff|font.css)',
              headers: [
                {
                  key: 'Access-Control-Allow-Origin',
                  value: '*',
                },
              ],
            },
            {
              source: '**/*.@(jpg|jpeg|gif|png)',
              headers: [
                {
                  key: 'Cache-Control',
                  value: 'max-age=7200',
                },
              ],
            },
            {
              source: '404.html',
              headers: [
                {
                  key: 'Cache-Control',
                  value: 'max-age=300',
                },
              ],
            },
          ],
          cleanUrls: true,
          trailingSlash: false,
        },
      },
      null,
      2,
    )
    const expected = JSON.stringify(
      {
        functions: {
          source: 'another-folder',
        },
        hosting: {
          public: 'app',
          ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
          redirects: [
            {
              source: '/foo',
              destination: '/bar',
              type: 301,
            },
            {
              source: '/firebase/*',
              destination: 'https://www.firebase.com',
              type: 302,
            },
          ],
          rewrites: [
            {
              source: '/app/**',
              destination: '/app/index.html',
            },
            {
              source: '**',
              function: 'app',
            },
          ],
          headers: [
            {
              source: '**/*.@(eot|otf|ttf|ttc|woff|font.css)',
              headers: [
                {
                  key: 'Access-Control-Allow-Origin',
                  value: '*',
                },
              ],
            },
            {
              source: '**/*.@(jpg|jpeg|gif|png)',
              headers: [
                {
                  key: 'Cache-Control',
                  value: 'max-age=7200',
                },
              ],
            },
            {
              source: '404.html',
              headers: [
                {
                  key: 'Cache-Control',
                  value: 'max-age=300',
                },
              ],
            },
          ],
          cleanUrls: true,
          trailingSlash: false,
        },
      },
      null,
      2,
    )
    require('fs-extra').__setFilesManifest({
      [filename]: given,
    })
    const addRewrites = require('../../scripts/utils/addRewrites')

    expect.assertions(4)
    return addRewrites().then((actual) => {
      expect(actual.filename).toMatch(filename)
      expect(actual.content).toEqual(expected)
      expect(console.info).toHaveBeenCalledTimes(1)
      expect(console.info).toHaveBeenCalledWith(expect.stringContaining('Redefining "**" rewrite to point to app function'))
    })
  })

  it('no firebase.json', () => {
    const addRewrites = require('../../scripts/utils/addRewrites')
    expect.assertions(3)
    return addRewrites().then((res) => {
      expect(res).toBeUndefined()
      expect(console.error).toHaveBeenCalledTimes(1)
      expect(console.error).toHaveBeenCalledWith(expect.stringMatching('Error: no file firebase.json. Please check if you intitialized project with Firebase'))
    })
  })
  /* eslint-enable no-underscore-dangle, global-require, no-console */
})
