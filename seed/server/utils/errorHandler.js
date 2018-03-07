// @flow
import type { $Response } from 'express'

const { log } = console
const errorHandler = (err: Error, response: $Response): $Response => {
  const { message } = err
  log('================\nerror occured:\n', err, '\n==================')
  if (message.match(/Firestore API is not enabled/)) {
    const projectName = message.substring(message.indexOf('project ') + 8)
    const msg = `Looks like your haven't enabled Firestore in your <strong>${projectName}</strong> project.\n
    Please, visit <a target="_blank" href="https://console.firebase.google.com/project/${projectName}/overview">${projectName}</a> and enable Firesore.`
    return response.status(500).send(msg)
  }
  return response.status(500).send(`${err.message}`)
}

export default errorHandler
