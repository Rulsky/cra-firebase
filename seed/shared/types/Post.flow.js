// @flow
import type { AuthorType } from './Author.flow'

export type PostType = {
  title: string,
  text: string,
  id: string,
  views: number,
  author: AuthorType,
}
