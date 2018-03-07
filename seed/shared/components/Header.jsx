// @flow
import React from 'react'
import styled from 'styled-components'

import ApolloLogo from './logos/Apollo'
import ReactLogo from './logos/ReactLogo'
import FirebaseLogo from './logos/Firebase'

const iconHeight = 48
const widthTreshhold = 782
const Wrapper = styled.header`
  background-color: #ffd7ea;
  position: relative;
`
const LogoSet = styled.div`
  left: 50%;
  position: relative;
  transform: translateX(-50%);
  max-width: 306px;
  @media (min-width: ${widthTreshhold}px) {
    position: absolute;
    left: .5rem;
    transform: none;
  }
`
const StyledApolloLogo = styled(ApolloLogo)`
  height: ${iconHeight - 7}px;
  margin: 0 .75rem;
  transform: translateY(-2px);
`
const StyledFirebaseLogo = styled(FirebaseLogo)`
  height: ${iconHeight}px;
`
const StyledReactLogo = styled(ReactLogo)`
  height: ${iconHeight}px;
`
const Plus = styled.span`
  display: inline-block;
  font-size: 22px;
  font-weight: bold;
  transform: translateY(-81%);
`
const Head = styled.header`
  border-bottom: 3px solid #FD93E4;
  font-size: 1.5rem;
  font-weight: bold;
  padding: .25rem .5rem;
  text-align: center;
  @media (min-width: ${widthTreshhold}px) {
    padding: .8rem .5rem;
    text-align: right;
  }
`


const Header = () => (
  <Wrapper>
    <LogoSet>
      <StyledFirebaseLogo />
      <Plus>+</Plus>
      <StyledApolloLogo />
      <Plus>+</Plus>
      <StyledReactLogo />
    </LogoSet>
    <Head>Sample code with graphQL and firebase</Head>
  </Wrapper>
)

export default Header
