import { compose, lifecycle, withProps } from 'recompose'
import { findDOMNode } from 'react-dom'

const onMount = compose(
  lifecycle({
    componentDidMount() {
      const node = findDOMNode(this)
      console.log(node)
    }
  })
)

export default compose(onMount)
