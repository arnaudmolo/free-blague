import styled from 'styled-components'
import React from 'react'
import { compose, withState, withHandlers, mapProps, withProps, branch, renderComponent, renderNothing } from 'recompose'
import { omit, negate } from 'lodash'
import diff from 'shallow-diff'

// USE WITH PRECAUTIONS. doesn't do clean things
export const withStyle = style => Component => styled(Component)`${style}`
export const omitProps = keys => mapProps(props => omit(props, keys))
export const orLoader = (test) =>
  branch(
    negate(test),
    renderComponent(props => <div>loader</div>)
  )
export function createLogger (prev) {
  return (next) => {
    console.log(diff(next, prev).updated)
    prev = next
  }
}
export const withLogger = withProps(createLogger({}))
export const when = predicate => branch(negate(predicate), renderNothing)

const Gui = styled.div`background:red;`

export const GuiCreator = (stateName) =>
  compose(
    withState(stateName, 'set' + stateName, props => props[stateName]),
    withHandlers({
      onChange: props => event => props['set' + stateName](+event.target.value)
    }),
    BaseComponent => props =>
      <g>
        <Gateway into='global'>
          <Gui>{stateName} => <input type='number' defaultValue={props[stateName]} step='0.5' onChange={props.onChange} /></Gui>
        </Gateway>
        <BaseComponent {...props} />
      </g>
  )
export const translate = (x, y) => `translate(${x}, ${y})`
