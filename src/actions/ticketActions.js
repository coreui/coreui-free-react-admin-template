import ticketService from '../services/ticketService'

export const toggleCreateTicketModalOpen = () => ({
  type: 'TOGGLE_CREATE_TICKET_MODAL_OPEN',
})

export const toggleCreateTicketModalClose = () => ({
  type: 'TOGGLE_CREATE_TICKET_MODAL_CLOSE',
})

export const GET_ALL_TICKETS_REQUEST = () => ({
  type: 'GET_ALL_TICKETS_REQUEST',
})

export const GET_ALL_TICKETS_SUCCESS = (tickets) => ({
  type: 'GET_ALL_TICKETS_SUCCESS',
  payload: tickets,
})

export const GET_ALL_TICKETS_FAILURE = (error) => ({
  type: 'GET_ALL_TICKETS_FAILURE',
  payload: error,
})

export const getAllTicketAPI = () => (dispatch) => {
  dispatch(GET_ALL_TICKETS_REQUEST())
  ticketService
    .getAllTickets()
    .then((response) => {
      if (response.error) {
        dispatch(GET_ALL_TICKETS_FAILURE(response.error))
        throw new Error(response.error)
      } else {
        dispatch(GET_ALL_TICKETS_SUCCESS(response.data.results))
        return response
      }
    })
    .catch((error) => {
      dispatch(GET_ALL_TICKETS_FAILURE(error))
      throw new Error(error)
    })
}
