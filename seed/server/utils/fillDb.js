// @flow
import type { $Request, $Response } from 'express'

import db from '../data/connector'
import seed from '../data/seed'

const fillDb = async (req: $Request, res: $Response) => {
  const { authors, posts } = seed
  const postsKeys = Object.keys(posts)
  const authorsKeys = Object.keys(authors)
  const authorsResults = await Promise.all(authorsKeys.map(author =>
    db.collection('authors').doc(author).set({
      ...authors[author],
    })))
  const postsResults = await Promise.all(postsKeys.map(post =>
    db.collection('posts').doc(post).set({
      ...posts[post],
    })))
  let resp = "Some seed data hasn't been written"
  if (postsKeys.length === postsResults.length && authorsKeys.length === authorsResults.length) {
    resp = 'All seed data has been written successfully'
  }
  res.send(resp)
}

export default fillDb
