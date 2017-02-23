/**
*
* Header
*
*/

import React from 'react'

import styled from 'styled-components'

const HeaderContainer = styled.div`
  height: 65px;
  line-height: 65px;
`

class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <HeaderContainer>Digital Content Interest Mapping</HeaderContainer>
    )
  }
}

Header.propTypes = {

}

export default Header
