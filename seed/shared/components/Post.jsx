// @flow
import React from 'react'
import styled from 'styled-components'
import Author from './Author'

import type { PostType } from '../types/Post.flow'

type Props = {
  props: PostType
}

const PostWrapper = styled.div`
  &:last-child {
    margin-bottom: 0rem;
  }
`
const Title = styled.p`
  font-weight: bold;
  text-align: center;
  &:first-letter {
    text-transform: capitalize;
  }
`
const Descr = styled.p`
  margin: .25rem 0;
  text-align: right;
`
const Text = styled.p`
  margin: .75rem 0 1.5rem;
`

const Post = ({
  props: {
    title, text, views, author,
  },
}: Props) => (
  <PostWrapper>
    <div>
      <Title>{title}</Title>
      <Descr>by <Author props={author} /> | {views} {views === 1 ? 'view' : 'views'} </Descr>
    </div>
    <Text>{text}</Text>
  </PostWrapper>
)


export default Post
