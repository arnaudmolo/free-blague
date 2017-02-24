/*
 *
 * JokePage
 *
 */

import React from 'react'
import { compose, withProps } from 'recompose'
import Joke from 'components/Joke'
import BigComponent from 'components/BigComponent'
import styled from 'styled-components'

const Container = styled.div`
  min-height: calc(100vh - 65px);
`

export class JokePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render (props = this.props) {
    return (
      <Container style={{background: '#' + props.content}}>
        <Joke content={props.content}><BigComponent /></Joke>
      </Container>
    )
  }
}

export default compose(
  withProps(props => ({content: props.params.id}))
)(JokePage)
