/**
*
* BigComponent
*
*/

import React from 'react'
import styled from 'styled-components'
import { branch, compose, lifecycle, renderComponent, withState } from 'recompose'

export const Big = styled.div`
  min-height: 1500px;
`

class BigComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render (props = this.props) {
    return (
      <Big>
        <h1>Big Component </h1>
        {props.data.non_personalized.map(string => <p key={string}>{string}</p>)}
      </Big>
    )
  }
}

export default compose(
  withState('data', 'dataLoaded', false),
  lifecycle({
    componentDidMount () {
      window.fetch('https://api.whatdoestrumpthink.com/api/v1/quotes')
        .then(res => res.json())
        .then(({messages}) => messages)
        .then(this.props.dataLoaded)
    }
  }),
  branch(
    props => !props.data,
    renderComponent(props => <h1>Loader</h1>)
  )
)(BigComponent)
