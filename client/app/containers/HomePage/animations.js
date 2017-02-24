import React from 'react'
import { Motion, spring } from 'react-motion'
import styled from 'styled-components'
import { compose, withState, withHandlers } from 'recompose'

import { browserHistory } from 'react-router'
import { HEADER_HEIGHT } from 'components/Header'
import animationContainer from 'containers/Animation'

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
    setStyle: props => event =>
      props.setStyle(getBoundingClientRect(event.target))
  })
)

const State = compose(
  withState('fullscreen', 'set', false),
  withHandlers({
    onClick: props => event => {
      event.persist()
      props.setStyle(event)
      props.startAnimation()
      browserHistory.push('/joke/' + props.content)
      return props.set(state => !state)
    }
  })
)

const onAnimationEnd = withHandlers({
  onRest: props => _ => props.stopAnimation()
})

const Masque = styled.div`
${props =>
  props.expanded &&
    `position: fixed;
    width: 100%;
    height: 100%
    top: 0;
    left: 0;`
}`

const Animation = compose(
  animationContainer,
  Style, State,
  onAnimationEnd,
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
          top: spring(HEADER_HEIGHT),
          bottom: spring(window.innerHeight)}}
        >
        {i10 => {
          return (
            <Masque expanded style={{
              transform: translate(0, i10.top),
              clip: `rect(0px, 100vw, ${i10.bottom}px, 0)`
            }}>
              <Component {...props} animating />
              <Component {...props} />
            </Masque>
          )
        }}
      </Motion><Component {...props} /></span>
    )
  }
)

export default Animation