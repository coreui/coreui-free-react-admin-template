/* eslint-disable prettier/prettier */
const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
  theme: 'light',
  isCreateTicketModalOpen: true,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarShow: !state.sidebarShow,
      }
    case 'TOGGLE_UNFOLDABLE':
      return {
        ...state,
        sidebarUnfoldable: !state.sidebarUnfoldable,
      }
    case 'CHANGE_THEME':
      return {
        ...state,
        theme: action.payload,
      }
    case 'TOGGLE_CREATE_TICKET_MODAL_OPEN':
      return {
        ...state,
        isCreateTicketModalOpen: true,
      }
    case 'TOGGLE_CREATE_TICKET_MODAL_CLOSE':
      return {
        ...state,
        isCreateTicketModalOpen: false,
      }
    default:
      return state
  }
}

export default appReducer
