import { describe, it, expect, beforeEach } from 'vitest'
import { legacy_createStore as createStore } from 'redux'

// Import the reducer logic
const initialState = {
  sidebarShow: true,
  theme: 'light',
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

describe('Redux Store', () => {
  let store

  beforeEach(() => {
    store = createStore(changeState)
  })

  it('has correct initial state', () => {
    const state = store.getState()
    expect(state.sidebarShow).toBe(true)
    expect(state.theme).toBe('light')
  })

  it('updates sidebarShow with set action', () => {
    store.dispatch({ type: 'set', sidebarShow: false })
    expect(store.getState().sidebarShow).toBe(false)
  })

  it('updates theme with set action', () => {
    store.dispatch({ type: 'set', theme: 'dark' })
    expect(store.getState().theme).toBe('dark')
  })

  it('updates multiple properties with set action', () => {
    store.dispatch({ type: 'set', sidebarShow: false, theme: 'dark' })
    const state = store.getState()
    expect(state.sidebarShow).toBe(false)
    expect(state.theme).toBe('dark')
  })

  it('adds new properties with set action', () => {
    store.dispatch({ type: 'set', sidebarUnfoldable: true })
    expect(store.getState().sidebarUnfoldable).toBe(true)
  })

  it('returns current state for unknown action types', () => {
    const stateBefore = store.getState()
    store.dispatch({ type: 'UNKNOWN_ACTION' })
    const stateAfter = store.getState()
    expect(stateAfter).toEqual(stateBefore)
  })

  it('preserves existing state when updating', () => {
    store.dispatch({ type: 'set', sidebarShow: false })
    expect(store.getState().theme).toBe('light') // theme should remain unchanged
  })
})
