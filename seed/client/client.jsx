// @flow
import React from 'react'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { ApolloProvider } from 'react-apollo'

import { GRAPHQL_API_ENDPOINT } from '../shared/constants/api'
import App from '../shared/components/App'

// eslint-disable-next-line no-underscore-dangle
const cache = new InMemoryCache().restore(window.__APOLLO_STATE__)
persistCache({
  cache,
  storage: window.localStorage,
})

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_API_ENDPOINT }),
  cache,
})

const ClientRoot = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

export default ClientRoot
