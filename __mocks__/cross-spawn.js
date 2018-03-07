const spawn = jest.genMockFromModule('cross-spawn')

const __applySpy = (spy, func) => {
  spawn[spy] = func
}

spawn.__applySpy = __applySpy

module.exports = spawn
