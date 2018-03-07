// @flow
import React from 'react'
import styled from 'styled-components'

type LinkProps = {
  reftext: string,
  href: string,
  className: string,
}

type LinkWrapperProps = {
  ...LinkProps,
  preText: string,
  endText: ?string,
}

const Link = ({ className, href, reftext }: LinkProps) =>
  <a className={className} href={href}>{reftext}</a>

const color = '#103b5e'
const mediaTreshhold = '673px'
const StyledLink = styled(Link)`
  color: ${color};
  transition: .3s ease;
  &:visited {
    color: ${color};
  }
  &:hover {
    color: #265a85;
  }
`
const StyledFooter = styled.footer`
  background-color: #c8d3ff;
  padding: 1rem .25rem;
`

const LinkWrapper = ({
  href, preText, reftext, className, endText,
}: LinkWrapperProps) => (
  <span className={className}>{preText} <StyledLink href={href} reftext={reftext} />{endText}</span>
)

const StyledLinkWrapper = styled(LinkWrapper)`
  margin-right: 1rem;
  &:last-child {
    margin-right: 0;
  }
  @media (max-width: ${mediaTreshhold}) {
    display: block;
    text-align: center;
  }
`

const Footer = () => (
  <StyledFooter>
    <StyledLinkWrapper preText="Created by" href="https://github.com/Rulsky" reftext="Ruslan Zaytsev" endText=";" />
    <StyledLinkWrapper preText="With help of" href="https://www.apollographql.com/" reftext="Apollo" endText=";" />
    <StyledLinkWrapper preText="And help of" href="https://reactjs.org/" reftext="React" endText=";" />
    <StyledLinkWrapper preText="Hosted by" href="https://firebase.google.com/" reftext="Firebase" endText=";" />
  </StyledFooter>
)

export default Footer
