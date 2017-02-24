
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose, pure } from 'recompose'
import styled from 'styled-components'
import messages from './messages'
import Joke from 'components/Joke'
import BigComponent from 'components/BigComponent'
import Animation from './animations'
import onEnterAnimation from './arrivage'

function getRandomColor () {
  const letters = '0123456789ABCDEF'
  let color = ''
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const jokes = Array(99).fill().map(getRandomColor)

const Min = styled.div`min-height: 800px;`

const AnimatedJoke = compose(Animation)(props =>
  <div style={{background: '#' + props.content}}>
    <Joke content={props.content} onClick={props.onClick} />
    {props.animating && <BigComponent simple />}
  </div>
)

const Hero = styled.div`min-height: 550px`

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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

export default onEnterAnimation(HomePage)
