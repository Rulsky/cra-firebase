// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import type { OperationComponent } from 'react-apollo'
import type { PostType } from '../types/Post.flow'

import { API_ENDPOINT } from '../constants/api'
import Post from './Post'
import Btn from './Btn'

type Response = {
  allPosts: PostType[]
}

type PostsState = {
  fillDbResult: string,
}

const styles = `
margin: 1rem .25rem;
min-height: calc(100vh - 48px - 53px);
max-width: 960px;
`
const PlaceHolder = styled.div`
  ${styles}
  position: relative;
`
const PostsWrapper = styled.div`
  ${styles}
`
const TextCentered = styled.p`
  text-align: center;
`

const ALL_POSTS_QUERY = gql`
query AllPosts {
  allPosts {
    id
    title
    text
    views
    author {
      firstName
      lastName
    }
  }
}
`
const withPosts: OperationComponent<Response> = graphql(ALL_POSTS_QUERY)

class Posts extends Component<OperationComponent, PostsState> {
  state = {
    fillDbResult: '',
  }
  render() {
    const { data: { loading, error, allPosts } } = this.props
    if (loading) {
      return <PlaceHolder>Loading...</PlaceHolder>
    }
    if (error) {
      return <PlaceHolder>{error.message}</PlaceHolder>
    } if (allPosts.length < 1) {
      return (
        <PlaceHolder>
          <TextCentered>Looks like Firestore is empty.</TextCentered>
          <Btn
            innerText="Fill DB with seed data"
            onClick={() => {
            const url = `${API_ENDPOINT}/seeddb`
            fetch(url)
              .then(res => res.text())
              .then(text => this.setState({ fillDbResult: text }))
          }}
          />
          <p>{this.state.fillDbResult}</p>
        </PlaceHolder>
      )
    }
    return (
      <PostsWrapper>
        {allPosts.map(p => <Post props={p} key={p.id} />)}
      </PostsWrapper>
    )
  }
}

export default withPosts(Posts)
