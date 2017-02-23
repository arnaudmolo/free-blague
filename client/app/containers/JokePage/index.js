/*
 *
 * JokePage
 *
 */

import React from 'react'
import { compose, withProps } from 'recompose'
import Joke from 'components/Joke'
import BigComponent from 'components/BigComponent'

export class JokePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render (props = this.props) {
    return (
      <div>
        <Joke content={props.content}><BigComponent /></Joke>
      </div>
    )
  }
}

export default compose(
  withProps(props => ({content: props.params.id}))
)(JokePage)
