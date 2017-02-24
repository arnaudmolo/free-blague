/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose, withState, withHandlers } from 'recompose'
import styled from 'styled-components'
import messages from './messages'
import Joke from 'components/Joke'
import BigComponent from 'components/BigComponent'
import { Motion, spring } from 'react-motion'

function getRandomColor () {
  const letters = '0123456789ABCDEF'
  let color = ''
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const jokes = Array(10).fill().map(getRandomColor)

const State = compose(
  withState('fullscreen', 'set', false),
  withHandlers({
    onClick: props => event => props.set(state => !state)
  })
)

const Masque = styled.div`
${props => {
  if (props.expanded) {
    return `
      position: absolute;
      width: 100%;
      height: 100%
      top: 0;
      left: 0;
    `
  }
  return ``
}}
`
const translate = (x, y) => `translate(${x}px, ${y}px)`
import { browserHistory } from 'react-router'

const Animation = compose(
  State,
  withHandlers({
    onRest: props => _ =>
      browserHistory.push('/joke/' + props.content)
  }),
  Component => props => {
    if (!props.fullscreen) {
      return <Masque><Component {...props} /></Masque>
    }
    return (
      <Motion onRest={props.onRest} defaultStyle={{top: props.distance + 65, bottom: props.distance + (65 + 140)}} style={{top: spring(65), bottom: spring(window.innerHeight)}}>
        {i10 => {
          return <Masque expanded style={{
            transform: translate(0, i10.top),
            clip: `rect(0px, 100vw, ${i10.bottom}px, 0)`
          }}>
            <Component {...props} position={i10} expanded>
              <BigComponent simple />
            </Component>
          </Masque>
        }}
      </Motion>
    )
  }
)

const AnimatedJoke = compose(Animation)(Joke)

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <div>
          {jokes.map((j, k) => <AnimatedJoke key={j} content={j} distance={140 * k} />)}
        </div>
      </div>
    )
  }
}
