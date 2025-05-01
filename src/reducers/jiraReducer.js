const initialState = {
  jiraConfigList: [],
  loading: false,
  error: null,
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
    default:
      return state
  }
}

export default jiraReducer
