// @flow
import * as admin from 'firebase-admin'
import { config } from 'firebase-functions'

admin.initializeApp(config().firebase)

const db = admin.firestore()

export { admin }

export default db
