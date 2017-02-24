/*
 *
 * Animation reducer
 *
 */

import { fromJS } from 'immutable'
import {
  START_ANIMATION, END_ANIMATION
} from './constants'

const initialState = {animating: false}

function animationReducer (state = initialState, action) {
  switch (action.type) {
    case START_ANIMATION:
      return {animating: true}
    case END_ANIMATION:
      return {animating: false}
    default:
      return state
  }
}

export default animationReducer
