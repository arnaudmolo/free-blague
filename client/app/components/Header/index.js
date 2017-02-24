/**
*
* Header
*
*/

import React from 'react'
import { Link } from 'react-router'

import styled from 'styled-components'

const HeaderContainer = styled.div`
  height: 65px;
  line-height: 65px;
  a {color: white;}
`

const FixedContainer = styled.div`
  position: fixed;
  top; 0;
  left: 0;
  right: 0;
  background: #00253F;
  z-index: 10;
`

class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <HeaderContainer>
        <FixedContainer>
          <Link to='/'>Digital Content Interest Mapping</Link>
        </FixedContainer>
      </HeaderContainer>
    )
  }
}

export default Header
