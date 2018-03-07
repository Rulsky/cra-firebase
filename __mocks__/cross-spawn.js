const spawn = jest.genMockFromModule('cross-spawn')

/* eslint-disable no-underscore-dangle */
const __applySpy = (spy, func) => {
  spawn[spy] = func
}

spawn.__applySpy = __applySpy

module.exports = spawn
