// @flow
import React, { Component } from 'react'
// import { initializeApp, auth } from 'firebase/app'
// import 'firebase/auth'
import styled from 'styled-components'

import Header from './Header'
import Posts from './Posts'
import Footer from './Footer'

// import config from '../../shared/fbs-keys'

const Wrapper = styled.div`
  margin: 0 auto;
`
type Props = {

}

class App extends Component<Props> {
  componentDidMount() {
    // initializeApp(config)
    // const fa = auth()
    // fa.signInAnonymously()
    // fa.onAuthStateChanged((user) => {
    //   console.log('Autn state changed', user)
    // })
  }
  render() {
    return (
      <Wrapper>
        <Header />
        <Posts />
        <Footer />
      </Wrapper>
    )
  }
}

export default App
