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
import messages from './messages'
import Joke from 'components/Joke'

function getRandomColor () {
  const letters = '0123456789ABCDEF'
  let color = ''
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const jokes = Array(10).fill().map(getRandomColor)

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <div>
          {jokes.map(j => <Joke key={j} content={j} />)}
        </div>
      </div>
    )
  }
}
