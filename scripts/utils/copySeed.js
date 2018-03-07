const { srcDir, seedDir } = require('../../config/filelist')
const { copy } = require('fs-extra')
const runInstallPackages = require('./runInstallPackages')
const { errOut } = require('./logging')

const deps = [
  'apollo-cache-inmemory@^1.1.9',
  'apollo-cache-persist@^0.1.1',
  'apollo-client@^2.2.5',
  'apollo-link-http@^1.5.2',
  'apollo-link-schema@^1.0.6',
  'apollo-server-express@^1.3.2',
  'body-parser@^1.18.2',
  'cors@^2.8.4',
  'express@^4.16.2',
  'firebase@^4.10.1',
  'firebase-admin@^5.9.0',
  'firebase-functions@^0.8.1',
  'graphql@^0.13.1',
  'graphql-tag@^2.8.0',
  'graphql-tools@^2.21.0',
  'react-apollo@^2.0.4',
  'styled-components@^3.1.6',
]

const copySeed = () =>
  copy(seedDir, srcDir)
    .then(() => runInstallPackages(deps))
    .catch(err => errOut(err))

module.exports = copySeed
