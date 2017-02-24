import { createSelector } from 'reselect'

/**
 * Direct selector to the animation state domain
 */
const selectAnimationDomain = () => (state) => state.get('animation')

/**
 * Other specific selectors
 */

/**
 * Default selector used by Animation
 */

const makeSelectAnimation = () => createSelector(
  selectAnimationDomain(),
  substate => substate
)

export default makeSelectAnimation
export {
  selectAnimationDomain
}
