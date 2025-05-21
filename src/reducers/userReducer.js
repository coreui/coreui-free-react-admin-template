const initialState = {
  usersList: [],
  loading: false,
  error: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_USERS_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'GET_ALL_USERS_SUCCESS':
      return {
        ...state,
        loading: false,
        usersList: action.payload,
      }
    case 'GET_ALL_USERS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default userReducer
