
import { fromJS } from 'immutable'
import animationReducer from '../reducer'

describe('animationReducer', () => {
  it('returns the initial state', () => {
    expect(animationReducer(undefined, {})).toEqual(fromJS({}))
  })
})
