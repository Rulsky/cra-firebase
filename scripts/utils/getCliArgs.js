const getCliArgs = (params) => {
  const args = process.argv.slice(2)
  const reducer = (acc, curr) => {
    const criteria = `--${curr}=`
    const arg = args.find(el => el.startsWith(criteria))
    if (arg) {
      acc[curr] = arg.split(criteria)[1].split(',')
    }
    return acc
  }
  const makeResult = res => (Object.keys(res).length > 0 ? res : null)

  if (Array.isArray(params)) {
    return makeResult(params.reduce(reducer, {}))
  } else if (typeof params === 'string') {
    return makeResult(reducer({}, params))
  }

  return null
}

module.exports = getCliArgs
