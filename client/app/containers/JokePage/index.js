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

import { HEADER_HEIGHT } from 'components/Header'

const Container = styled.div`min-height: calc(100vh - ${HEADER_HEIGHT}px);`
const Fixed = styled.div`
  position: fixed;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  right: 0;
  z-index: 10;`
const Pose = styled.div`height: 140px`

const FixedContainer = props =>
  <Pose>
    <Fixed>{props.children}</Fixed>
  </Pose>

export class JokePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render (props = this.props) {
    return (
      <Container style={{background: '#' + props.content}}>
        <FixedContainer><Joke content={props.content} /></FixedContainer>
        <BigComponent />
      </Container>
    )
  }
}

export default compose(
  withProps(props => ({content: props.params.id}))
)(JokePage)
