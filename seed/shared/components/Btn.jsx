// @flow
import React from 'react'
import styled from 'styled-components'

type Props = {
  innerText: string,
  onClick: Function,
}

const StyledBtn = styled.button`
  background: none;
  border: 1px solid #FD93E4;
  font-size: 22px;
  padding: 10px;
  margin: 1rem auto 2rem;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`
const Btn = ({ innerText, onClick }: Props) => (
  <StyledBtn onClick={onClick}>{innerText}</StyledBtn>
)

export default Btn
