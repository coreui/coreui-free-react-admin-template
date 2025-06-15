const initialState = {
  projectList: [],
  loading: false,
  error: null,
  isEditProjectModalOpen: false,
  projectIdToEdit: null,
}

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_EDIT_PROJECT_MODAL_OPEN':
      return {
        ...state,
        isEditProjectModalOpen: true,
        projectIdToEdit: action.payload,
      }
    case 'TOGGLE_EDIT_PROJECT_MODAL_CLOSE':
      return {
        ...state,
        isEditProjectModalOpen: false,
        projectIdToEdit: null,
      }
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
    case 'ADD_NEW_PROJECT_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'ADD_NEW_PROJECT_SUCCESS':
      return {
        ...state,
        loading: false,
      }
    case 'ADD_NEW_PROJECT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case 'DELETE_PROJECT_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'DELETE_PROJECT_SUCCESS':
      return {
        ...state,
        loading: false,
      }
    case 'DELETE_PROJECT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case 'EDIT_PROJECT_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'EDIT_PROJECT_SUCCESS':
      return {
        ...state,
        loading: false,
      }
    case 'EDIT_PROJECT_FAILURE':
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
