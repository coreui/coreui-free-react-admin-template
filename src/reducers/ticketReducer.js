const initialState = {
  ticketList: [],
  loading: false,
  error: null,
  isCreateTicketModalOpen: true,
}

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case 'GET_ALL_TICKETS_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'GET_ALL_TICKETS_SUCCESS':
      return {
        ...state,
        loading: false,
        ticketList: action.payload,
      }
    case 'GET_ALL_TICKETS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default ticketReducer
