// @flow
import { https } from 'firebase-functions'
import express from 'express'
import cors from 'cors'

import type { $Request, $Response } from 'express'

import serverRender from './server/server.render'
import setupGraphQlServer from './server/data'
import fillDb from './server/utils/fillDb'

const expressApp = express()
expressApp.use(cors())
setupGraphQlServer(expressApp, 'api')

expressApp.get('/', serverRender)
expressApp.get('/test', (req: $Request, res: $Response) => { res.send('you got something!') })
expressApp.get('/api/seeddb', fillDb)
expressApp.get('/env', (req: $Request, res: $Response) => { res.json(process.env) })
const app = https.onRequest(expressApp)
// eslint-disable-next-line import/prefer-default-export
export { app }
