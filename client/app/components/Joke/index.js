/**
*
* Joke
*
*/

import React from 'react'
import { findDOMNode } from 'react-dom'
import { branch, defaultProps, compose, lifecycle, renderComponent, withState, withHandlers, withProps, renderNothing } from 'recompose'
import { browserHistory } from 'react-router'
import { Container, JokeContainer, Viz, Top, Big } from './styles'
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

const BigComponent = compose(
  withState('data', 'dataLoaded', false),
  lifecycle({
    componentDidMount () {
      window.fetch('https://api.whatdoestrumpthink.com/api/v1/quotes')
        .then(res => res.json())
        .then(({messages}) => messages)
        .then(this.props.dataLoaded)
        .then(_ => console.log('ok'))
    }
  }),
  branch(
    props => !props.data,
    renderComponent(props => <h1>Loader</h1>)
  )
)(props =>
  <Big>
    <h1>Big Component </h1>
    {props.data.non_personalized.map(string => <p key={string}>{string}</p>)}
  </Big>)

function Joke (props) {
  return (
    <JokeContainer
      className={props.fullscreen && 'ok'}
      bgColor={props.content}
      fullscreen={props.fullscreen}
      onClick={props.toggleFullscreen}>
      <p style={{display: 'inline-block'}}>{props.content}</p>
      <Viz />
      {props.fullscreen && <BigComponent />}
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

const Animate = compose(
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

import { connect } from 'react-redux'

export const Router = compose(
  withProps(props => ({content: props.params.id})),
  defaultProps({fullscreen: false}),
  connect(state => ({
    isFirstLoad: !!state.get('route').get('locationBeforeTransitions')
  })),
  branch(
    props => !props.isFirstLoad,
    compose(
      Component => props =>
        <Motion
          defaultStyle={{top: window.innerHeight / 2, bottom: window.innerHeight / 2}}
          style={{top: spring(0), bottom: spring(window.innerHeight)}}>
          {i10 => <Component {...props} position={i10} />}
        </Motion>,
      Animate,
    )
  )
)(Joke)

const Static = compose(
  withProps(props => ({fullscreen: false}))
)(Joke)

const Animated = compose(
  Animation,
  Animate
)(Joke)

export default compose(
  Style,
  State
)(props =>
  <Container fullscreen={props.fullscreen} bgColor={props.content}>
    <Static {...props} />
    <Animated {...props} />
  </Container>
)
