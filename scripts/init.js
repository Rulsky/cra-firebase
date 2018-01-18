const prompt = require('./utils/prompt')
const updatePack = require('./utils/updatePack.js')
const updateGitignore = require('./utils/updateGitignore.js')
const addRewrites = require('./utils/addRewrites')
const logging = require('./utils/logging')

const yNMatcher = new RegExp(/\b(?:yes|no|y|n)\b/, 'gim')
const testAnswerYes = str => str.toLowerCase().match(/(yes|y)/)

const init = (
  updP = updatePack,
  updG = updateGitignore,
  addR = addRewrites,
  l = logging,
  pr = prompt,
) => {
  if (
    typeof updP !== 'function' ||
    typeof updG !== 'function' ||
    typeof addR !== 'function' ||
    typeof l !== 'object' ||
    typeof pr !== 'function'
  ) {
    throw new Error('no proper DI was provided. Try to call without arguments')
  }
  if (process.argv.slice(2).indexOf('-y') !== -1) {
    return Promise.resolve(l.infoOut('Modifying package.json scripts build command'))
      .then(updP())
      .then(l.infoOut('Success\nAdding rewrite rule to firebase.json'))
      .then(addR())
      .then(l.infoOut('Success\nAdding new entries to .gitignore'))
      .then(updG())
      .then(l.okOut('Success\nFinish'))
      .catch(err => l.errOut(`${err.stack}`))
  }

  const promptParam = {
    d: 'y',
    pattern: yNMatcher,
    message: 'answer must be yes || no || y || n (case insensetive)',
  }
  return pr({
    ...promptParam,
    q: 'Modyfy build command in scripts? (y/n)',
  })
    .then((answer) => {
      if (testAnswerYes(answer)) {
        l.infoOut('Modifying package.json scripts build command')
        return updP()
      }
      l.infoOut('Skips modifying package.json')
      return null
    })
    .then(() => pr({ ...promptParam, q: 'Add rewrite rule to firebase.json? (y/n)' }))
    .then((answer) => {
      if (testAnswerYes(answer)) {
        l.infoOut('Adding rewrite rule to firebase.json')
        return addR()
      }
      l.infoOut('Skips adding rewrite rule to firebase.json')
      return null
    })
    .then(() => pr({ ...promptParam, q: 'Add dynamicly generated files to .gitignore? (y/n)' }))
    .then((answer) => {
      if (testAnswerYes(answer)) {
        l.infoOut('Adding new entries to .gitignore')
        return updG()
      }
      l.infoOut('Skips modifying .gitignore')
      return null
    })
    .catch(err => l.errOut(`${err.stack}`))
}

module.exports = init
