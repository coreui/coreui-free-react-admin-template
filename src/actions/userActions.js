import ticketService from '../services/userService'

export const GET_ALL_USERS_REQUEST = () => ({
  type: 'GET_ALL_USERS_REQUEST',
})

export const GET_ALL_USERS_SUCCESS = (users) => ({
  type: 'GET_ALL_USERS_SUCCESS',
  payload: users,
})

export const GET_ALL_USERS_FAILURE = (error) => ({
  type: 'GET_ALL_USERS_FAILURE',
  payload: error,
})

export const getAllUsersAPI = () => (dispatch) => {
  dispatch(GET_ALL_USERS_REQUEST())
  ticketService
    .getAllUsers()
    .then((response) => {
      if (response.error) {
        dispatch(GET_ALL_USERS_FAILURE(response.error))
        throw new Error(response.error)
      } else {
        dispatch(GET_ALL_USERS_SUCCESS(response.data.results))
        return response
      }
    })
    .catch((error) => {
      dispatch(GET_ALL_USERS_FAILURE(error))
      throw new Error(error)
    })
}
