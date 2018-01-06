const { join } = require('path')

const readFilenames = jest.fn((p) => {
  const srcDir = join(process.cwd(), 'src')
  const index = join(srcDir, 'server.index.js')
  const shared = join(srcDir, 'shared')
  const server = join(srcDir, 'server')
  switch (p) {
    case index:
      return [join(process.cwd(), '/src/server.index.js')]
    case shared:
      return [
        join(process.cwd(), '/src/shared/components/App/App.css'),
        join(process.cwd(), '/src/shared/components/App/App.js'),
        join(process.cwd(), '/src/shared/components/App/App.test.js'),
        join(process.cwd(), '/src/shared/components/App/logo.svg'),
        join(process.cwd(), '/src/shared/components/Btn.jsx'),
      ]
    case server:
      return [
        join(process.cwd(), '/src/server/initStore.js'),
        join(process.cwd(), '/src/server/triggers/example.js'),
      ]
    default:
      return []
  }
})

module.exports = readFilenames
