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
