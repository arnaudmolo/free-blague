/**
*
* Joke
*
*/

import React from 'react'
import { findDOMNode } from 'react-dom'
import { branch, defaultProps, compose, lifecycle, renderComponent, withState, withHandlers, withProps, renderNothing } from 'recompose'
import { browserHistory } from 'react-router'

import { Container, JokeContainer, Viz, Top } from './styles'
import { mapValues, delay } from 'lodash'
import { Motion, spring as _spring } from 'react-motion'

const spring = arg => _spring(arg)

const when = (predicate) => branch(predicate, renderComponent, renderNothing)
when

function getBoundingClientRect (element) {
  const rect = element.getBoundingClientRect()
  return {
    top: rect.top,
    bottom: rect.bottom
  }
}

function Joke (props) {
  return (
    <JokeContainer
      expanded={props.expanded}
      bgColor={props.content}
      onClick={props.onClick}>
      <p style={{display: 'inline-block'}}>{props.content}</p>
      <Viz />
      {props.children}
    </JokeContainer>
  )
}

const Style = compose(
  withState('innerStyle', 'setStyle', false),
  withHandlers({
    setStyle: props => event => {
      const element = event.target
      const collapsed = getBoundingClientRect(element)
      element.classList.toggle('ok')
      const expanded = getBoundingClientRect(element)
      element.classList.toggle('ok')
      props.setStyle({
        collapsed, expanded
      })
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
    toggleFullscreen: props => event => {
      event.persist()
      if (!props.fullscreen) {
        props.setStyle(event)
      }
      delay(() => props.set(s => !s), 100)
    }
  })
)

const Animation = compose(
  withHandlers({
    onRest: props => _ =>
      browserHistory.push('/joke/' + props.content)
  }),
  Component => {
    return props => {
      if (props.innerStyle) {
        const style = props.fullscreen
          ? props.innerStyle.expanded
            : props.innerStyle.collapsed
        return (
          <Motion
            onRest={props.onRest}
            defaultStyle={props.innerStyle.collapsed}
            style={mapValues(style, spring)}>
            {i10 => <Component {...props} position={i10} />}
          </Motion>
        )
      }
      return <Component {...props} />
    }
  }
)

const maskStyle = position => ({
  position: 'fixed',
  clip: `rect(${position.top}px, 100vw, ${position.bottom}px, 0)`
})

const Animate2 = compose(
  Component => {
    return props => {
      return (
        <Top style={(props.fullscreen) ? maskStyle(props.position) : null}>
          <Component {...props} />
        </Top>
      )
    }
  }
)

export const Router = compose(
  withProps(props => ({content: props.params.id})),
  defaultProps({fullscreen: false})
)(Joke)

const Static = compose(
  withProps(props => ({fullscreen: false}))
)(Joke)

const Animated = compose(
  Animation,
  Animate2
)(Joke)

export const Animate = compose(
  Style,
  State
)(props =>
  <Container fullscreen={props.fullscreen} bgColor={props.content}>
    <Static {...props} />
    <Animated {...props} />
  </Container>
)

export default Joke
