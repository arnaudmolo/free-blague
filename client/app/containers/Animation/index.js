/*
 *
 * Animation
 *
 */

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import makeSelectAnimation from './selectors'
import { start, stop } from './actions'

const mapStateToProps = createStructuredSelector({
  Animation: makeSelectAnimation()
})

function mapDispatchToProps (dispatch) {
  return {
    startAnimation: () => dispatch(start()),
    stopAnimation: () => dispatch(stop())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
