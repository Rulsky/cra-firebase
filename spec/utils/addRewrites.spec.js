const { join } = require('path')

describe('addRewrites', () => {
  /* eslint-disable no-underscore-dangle, global-require, no-console */
  const clutter = {
    hosting: {
      public: 'build',
      ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
    },
  }
  const protoGiven = {
    ...clutter,
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
        ...protoGiven,
        rewrites: [expectedRule],
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
        ...protoGiven,
        rewrites: [
          {
            source: '**',
            destination: '/index.html',
          },
        ],
      },
      null,
      2,
    )
    const expected = JSON.stringify(
      {
        ...protoGiven,
        rewrites: [expectedRule],
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
        ...protoGiven,
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
      null,
      2,
    )
    const expected = JSON.stringify(
      {
        ...protoGiven,
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
        ...protoGiven,
        rewrites: [
          {
            source: '/somerounte',
            destination: '/somefile.html',
          },
        ],
      },
      null,
      2,
    )
    const expected = JSON.stringify(
      {
        ...protoGiven,
        rewrites: [
          {
            source: '/somerounte',
            destination: '/somefile.html',
          },
          expectedRule,
        ],
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
        ...protoGiven,
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
      null,
      2,
    )
    const expected = JSON.stringify(
      {
        ...protoGiven,
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
        ...protoGiven,
        rewrites: [
          {
            source: '**',
            function: 'app',
          },
        ],
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
    const givenFuncName = 'myCustomFunc'
    const given = JSON.stringify(
      {
        ...protoGiven,
        rewrites: [
          {
            source: '**',
            function: givenFuncName,
          },
        ],
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
        ...protoGiven,
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
