/*
 *
 * Animation actions
 *
 */

import {
  START_ANIMATION,
  END_ANIMATION
} from './constants'

export function start () {
  return {
    type: START_ANIMATION
  }
}


export function stop () {
  return {
    type: END_ANIMATION
  }
}
