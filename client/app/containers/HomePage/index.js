
import React from 'react'
import { findDOMNode } from 'react-dom'
import { FormattedMessage } from 'react-intl'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import styled from 'styled-components'
import messages from './messages'
import Joke from 'components/Joke'
import BigComponent from 'components/BigComponent'
import { Motion, spring } from 'react-motion'
import { browserHistory } from 'react-router'

function getRandomColor () {
  const letters = '0123456789ABCDEF'
  let color = ''
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const jokes = Array(10).fill().map(getRandomColor)

const Masque = styled.div`
${props => {
  if (props.expanded) {
    return `
      position: fixed;
      width: 100%;
      height: 100%
      top: 0;
      left: 0;
    `
  }
  return `
    height: 20%;
  `
}}`
const translate = (x, y) => `translate(${x}px, ${y}px)`
function getBoundingClientRect (element) {
  const rect = element.getBoundingClientRect()
  return {
    top: rect.top,
    bottom: rect.bottom
  }
}

const Style = compose(
  withState('innerStyle', 'setStyle', false),
  withHandlers({
    setStyle: props => event => {
      const collapsed = getBoundingClientRect(event.target)
      props.setStyle(collapsed)
    }
  }),
  lifecycle({
    componentDidMount () {
      this.props.setStyle({target: findDOMNode(this)})
    }
  })
)

const State = compose(
  withState('fullscreen', 'set', false),
  withHandlers({
    onClick: props => event => {
      event.persist()
      props.setStyle(event)
      return props.set(state => !state)
    }
  })
)

const Animation = compose(
  Style,
  State,
  withHandlers({
    // onRest: props => _ => browserHistory.push('/joke/' + props.content)
  }),
  Component => props => {
    if (!props.fullscreen) {
      return <span><Masque><Component {...props} /></Masque></span>
    }
    return (
      <span><Motion
        onRest={props.onRest}
        defaultStyle={{
          top: props.innerStyle.top,
          bottom: props.innerStyle.bottom
        }}
        style={{
          top: spring(65),
          bottom: spring(window.innerHeight)}}
        >
        {i10 => {
          return <Masque expanded style={{
            transform: translate(0, i10.top),
            clip: `rect(0px, 100vw, ${i10.bottom}px, 0)`
          }}>
            <Component {...props}>
              <BigComponent simple />
            </Component>
            <Component {...props} />
          </Masque>
        }}
      </Motion><Component {...props} /></span>
    )
  }
)

const AnimatedJoke = compose(Animation)(Joke)
const Hero = styled.div`min-height: 550px`

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <div>
        <Hero>
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
        </Hero>
        <div>
          {jokes.map((j, k) => <AnimatedJoke key={j} content={j} />)}
        </div>
      </div>
    )
  }
}
