// @flow
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import bodyParser from 'body-parser'
import { printSchema } from 'graphql/utilities/schemaPrinter'

import type { $Application, $Request, $Response } from 'express'

import schema from './schema'

const setupGraphQLServer = (app: $Application, rootPoint: string) => {
  app.use(
    `/${rootPoint}/graphql`,
    bodyParser.json(),
    graphqlExpress({ schema, context: {} }),
  )
  app.use(
    `/${rootPoint}/graphiql`,
    graphiqlExpress({ endpointURL: '/api/graphql' }),
  )
  app.use(`/${rootPoint}/schema`, (req: $Request, res: $Response) => {
    res.set('Content-Type', 'text/plain')
    res.send(printSchema(schema))
  })
  app.get(`/${rootPoint}`, (req: $Request, res: $Response) => res.send('this is an API root point'))
  return app
}

export default setupGraphQLServer
