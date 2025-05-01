const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
      }
    case 'LOGOUT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case 'AUTH_CHECK_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      }
    case 'LOGIN_FAILURE':
    case 'AUTH_CHECK_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    case 'AUTH_CHECK_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default authReducer
