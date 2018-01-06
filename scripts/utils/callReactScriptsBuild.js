const callReactScriptsBuild = (spawn) => {
  const result = spawn.sync('node', ['node_modules/react-scripts/scripts/build.js'], {
    stdio: 'inherit',
  })
  if (result.signal) {
    const err = new Error('error while building client code')
    err.type = 'CRA_BUILD'
    return err
  }
  return result
}

module.exports = callReactScriptsBuild
