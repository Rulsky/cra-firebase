// @flow
import { makeExecutableSchema } from 'graphql-tools'
import { Author, Post } from '../../shared/types/index.gql'

import resolvers from './resolvers'

const Query = `
type Query {
  allAuthors: [Author]
  authorByName(firstName: String, lastName: String): [Author]
  authorById(id: ID): Author
  allPosts: [Post]
}
`
const Mutation = `
type Mutation {
  incrementPostViews(postId: ID!): Post
  addPost(title: String!, text: String!, authorId: ID!): Post
  addAuthor(firstName: String!, lastName: String!): Author
}
`
/*
type Mutation {
  batchAddAuthors(Authors: [Author!]!)
  batchAddPosts(Posts: [Post!]!)
}
*/

export default makeExecutableSchema({
  typeDefs: [
    Author, Post, Query, Mutation,
  ],
  resolvers,
})
