// @flow
import React from 'react'
// $FlowFixMe: problem with react typing
import { hydrate } from 'react-dom'
import './index.css'
import App from './client/client'
// import registerServiceWorker from './registerServiceWorker'

hydrate(<App />, document.getElementById('root'))
// registerServiceWorker()
