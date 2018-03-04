const { sep } = require('path')
const runNpmI = require('../../scripts/utils/runNpmI')

describe('run npm i', () => {
  const mockFbsFuncDir = 'fbsFunctions'
  it('spawns with proper arguments', () => {
    const spawn = {
      sync: jest.fn(() => ({ signal: null })),
    }
    runNpmI(spawn, mockFbsFuncDir)
    expect(spawn.sync).toBeCalledWith('cd', [`${mockFbsFuncDir}${sep}`, '&&', 'npm', 'i'], {
      stdio: 'inherit',
      shell: true,
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

    const expected = new Error(`can't install deps in ${mockFbsFuncDir} directory`)
    expected.type = 'CRA_BUILD'

    expect(runNpmI(spawn, mockFbsFuncDir)).toEqual(expected)
  })
})
