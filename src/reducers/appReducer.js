/* eslint-disable prettier/prettier */
const initialState = {
  sidebarUnfoldable: false,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_UNFOLDABLE':
      return {
        ...state,
        sidebarUnfoldable: !state.sidebarUnfoldable,
      }
    default:
      return state
  }
}

export default appReducer
