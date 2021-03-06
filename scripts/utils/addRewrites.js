const { join } = require('path')
const { readFile, writeFile } = require('fs-extra')
const { errOut, infoOut } = require('./logging')

const filename = join(process.cwd(), 'firebase.json')
const defaultRule = {
  source: '**',
  function: 'app',
}
const replaceElem = (arr, idx, elem) => {
  const startPart = arr.slice(0, idx)
  startPart.push(elem)
  return startPart.concat(arr.slice(idx + 1))
}

const addRewrites = () =>
  readFile(filename)
    .then((res) => {
      if (res === undefined) {
        throw Error('no file firebase.json. Please check if you intitialized project with Firebase')
      }
      return res
    })
    .then(res => JSON.parse(res))
    .then((r) => {
      if (r.hosting.rewrites && r.hosting.rewrites.length > 0) {
        const idx = r.hosting.rewrites.findIndex(el => el.source === '**')
        if (idx !== -1) {
          if (
            r.hosting.rewrites[idx].destination &&
            r.hosting.rewrites[idx].destination === '/index.html'
          ) {
            infoOut('Redefining "**" rewrite to point to app function')
            return {
              ...r,
              hosting: {
                ...r.hosting,
                rewrites: replaceElem(r.hosting.rewrites, idx, defaultRule),
              },
            }
          } else if (
            r.hosting.rewrites[idx].function &&
            r.hosting.rewrites[idx].function === 'app'
          ) {
            infoOut('A correct rewrite rule is already present. Skipping...')
            return null
          } else if (
            r.hosting.rewrites[idx].function &&
            r.hosting.rewrites[idx].function !== 'app'
          ) {
            errOut(`In you firebase configuration '**' rewrite rule is alredy present and pointin to ${r
              .hosting.rewrites[idx]
              .function} function.\nCan't redefine rewrite rule\nsource: '**',\nfunction: ${r
              .hosting.rewrites[idx].function}\n\nPlease, resolve it manually.\nSkipping...`)
            return null
          }
          errOut(`In you firebase configuration '**' rewrite rule is alredy present and pointin to some custom file.\nCan't redefine rewrite rule\nsource: '**',\ndestination: ${r
            .hosting.rewrites[idx].destination}\n\nPlease, resolve it manually.\nSkipping...`)
          return null
        }

        infoOut('No rewrite ** rule found. Adding default rewrite rule.')
        return {
          ...r,
          hosting: {
            ...r.hosting,
            rewrites: [...r.hosting.rewrites, defaultRule],
          },
        }
      }
      infoOut('No rewrite rules found. Adding default rule')
      return {
        ...r,
        hosting: {
          ...r.hosting,
          rewrites: [defaultRule],
        },
      }
    })
    .then((res) => {
      if (res) {
        return writeFile(filename, JSON.stringify(res, null, 2))
      }
      return null
    })
    .catch((err) => {
      errOut('Error while adding rewrite rules:\n', err)
    })

module.exports = addRewrites
