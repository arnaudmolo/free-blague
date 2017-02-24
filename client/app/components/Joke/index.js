/**
*
* Joke
*
*/

import React from 'react'

import { JokeContainer, Viz } from './styles'

function Joke (props) {
  return (
    <JokeContainer
      expanded={props.expanded}
      bgColor={props.content}
      onClick={props.onClick}>
      <p style={{display: 'inline-block'}}>{props.content}</p>
      <Viz />
    </JokeContainer>
  )
}

export default Joke
