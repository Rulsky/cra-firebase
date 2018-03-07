import React from 'react'
import { renderToString } from 'react-dom/server'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'
import { ServerStyleSheet } from 'styled-components'

// eslint-disable-next-line  import/no-unresolved,import/extensions
import markup from '../markup'
import App from '../shared/components/App'
import schema from './data/schema'
import errorHandler from './utils/errorHandler'

const serverRender = (req, res) => {
  const link = new SchemaLink({ schema })
  const client = new ApolloClient({
    ssrMode: true,
    link,
    cache: new InMemoryCache(),
  })
  const sheet = new ServerStyleSheet()

  const component = (
    <ApolloProvider client={client} >
      <App />
    </ApolloProvider>
  )

  return getDataFromTree(component)
    .then(() => {
      const extract = client.extract()
      const content = renderToString(sheet.collectStyles(component))
      const styleTags = sheet.getStyleTags()
      res
        .status(200)
        .send(markup(content, { 'window.__APOLLO_STATE__': extract }, styleTags))
    })
    .catch(err => errorHandler(err, res))
}

export default serverRender
