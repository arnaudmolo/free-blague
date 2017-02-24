/**
*
* BigComponent
*
*/

import React from 'react'
import styled from 'styled-components'
import { branch, compose, lifecycle, renderComponent, withState } from 'recompose'
import armand from './armand.jpg'

export const Big = styled.div`
  min-height: 1500px;
`

const Grayscaled = styled.img`
  filter: grayscale(${props => props.simple ? 100 : 0}%);
`

const LoadedComponent = compose(
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
)(props => <div>{props.data.non_personalized.map(string => <p key={string}>{string}</p>)}</div>)

class BigComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render (props = this.props) {
    return (
      <Big>
        <h1>Big Component </h1>
        <Grayscaled simple={props.simple} src={armand} />
        <LoadedComponent />
      </Big>
    )
  }
}

export default BigComponent
