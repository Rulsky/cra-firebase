const { sep } = require('path')

const runNpmI = (spawn, firebaseFunctionsDir) => {
  const result = spawn.sync('cd', [`${firebaseFunctionsDir}${sep}`, '&&', 'npm', 'i'], {
    stdio: 'inherit',
    shell: true,
  })
  if (result.signal) {
    const err = new Error(`can't install deps in ${firebaseFunctionsDir} directory`)
    return err
  }
  return result
}

module.exports = runNpmI
