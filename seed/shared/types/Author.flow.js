// @flow
import type { PostType } from './Post.flow'

export type AuthorType = {
  id: string,
  firstName: string,
  lastName: string,
  posts: PostType[],
}
