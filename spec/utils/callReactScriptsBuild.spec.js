const callReactScriptsBuild = require('../../scripts/utils/callReactScriptsBuild')

it('spawns proper cra script', () => {
  const spawn = {
    sync: jest.fn(() => ({ signal: null })),
  }

  callReactScriptsBuild(spawn)
  expect(spawn.sync).toBeCalledWith('node', ['node_modules/react-scripts/scripts/build.js'], {
    stdio: 'inherit',
  })
  expect(spawn.sync).toHaveBeenCalledTimes(1)
})

it('returns error if process will signal', () => {
  const spawn = {
    sync: jest.fn(() => ({
      signal: 'SIGKILL',
      status: 0,
    })),
  }

  const expected = new Error('error while building client code')
  expected.type = 'CRA_BUILD'

  expect(callReactScriptsBuild(spawn)).toEqual(expected)
})
