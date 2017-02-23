
import { Motion, spring } from 'react-motion'
import { mapValues } from 'lodash'
import { compose, lifecycle, withState, withHandlers } from 'recompose'

const translate = (x, y) => `translate(${x}px, ${y}px)`
const transform = transform => ({transform})

export const Animation = Component =>
  props =>
    <Motion defaultStyle={props.position} style={mapValues(props.position, spring)}>
      {i10 => <Component {...props} position={i10} />}
    </Motion>

export const Animate = Component =>
  props =>
    <div style={transform(translate(props.position.x, props.position.y))}>
      <Component {...props} />
    </div>

export const Drag = compose(
  withState('position', 'set', {x: 0, y: 0}),
  withHandlers({
    onWindowMouseMove: props => event =>
      props.set({x: event.pageX, y: event.pageY})
  }),
  lifecycle({
    componentDidMount (props) {
      window.addEventListener('mousemove', this.props.onWindowMouseMove)
    }
  })
)
