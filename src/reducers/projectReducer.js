const initialState = {
  projectList: [],
  loading: false,
  error: null,
}

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_PROJECTS_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'GET_ALL_PROJECTS_SUCCESS':
      return {
        ...state,
        loading: false,
        projectList: action.payload,
      }
    case 'GET_ALL_PROJECTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default projectReducer
