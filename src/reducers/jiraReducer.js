const initialState = {
  configCanbeAdded: false,
  jiraConfigList: [],
  loading: false,
  error: null,
  isEditConfigJiraModalOpen: false,
  configIdToEdit: null,
}

const jiraReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_CONFIG_JIRA_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'GET_ALL_CONFIG_JIRA_SUCCESS':
      return {
        ...state,
        jiraConfigList: action.payload,
        loading: false,
      }
    case 'GET_ALL_CONFIG_JIRA_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case 'CHECK_CONNECTION_JIRA_API_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'CHECK_CONNECTION_JIRA_API_SUCCESS':
      return {
        ...state,
        configCanbeAdded: true,
        loading: false,
      }
    case 'CHECK_CONNECTION_JIRA_API_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        configCanbeAdded: false,
      }
    case 'ADD_NEW_CONFIG_JIRA_API_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'ADD_NEW_CONFIG_JIRA_API_SUCCESS':
      return {
        ...state,
        loading: false,
      }
    case 'ADD_NEW_CONFIG_JIRA_API_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case 'DELETE_CONFIG_JIRA_API_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'DELETE_CONFIG_JIRA_API_SUCCESS':
      return {
        ...state,
        loading: false,
      }
    case 'DELETE_CONFIG_JIRA_API_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case 'TOGGLE_EDIT_CONFIG_JIRA_MODAL_OPEN':
      return {
        ...state,
        isEditConfigJiraModalOpen: true,
        configIdToEdit: action.payload,
      }
    case 'TOGGLE_EDIT_CONFIG_JIRA_MODAL_CLOSE':
      return {
        ...state,
        isEditConfigJiraModalOpen: false,
      }
    case 'EDIT_CONFIG_JIRA_API_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'EDIT_CONFIG_JIRA_API_SUCCESS':
      return {
        ...state,
        loading: false,
      }
    case 'EDIT_CONFIG_JIRA_API_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default jiraReducer
