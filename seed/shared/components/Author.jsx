// @flow
import React from 'react'
import styled from 'styled-components'

import type { AuthorType } from '../types/Author.flow'

type Props = {
  props: AuthorType
}

const Name = styled.span`
  font-style: italic;
`

const Author = ({ props: { firstName, lastName } }: Props) => (
  <Name>{firstName} {lastName}</Name>
)

export default Author
