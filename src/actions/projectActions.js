import projectService from '../services/projectService'

export const GET_ALL_PROJECTS_REQUEST = () => ({
  type: 'GET_ALL_PROJECTS_REQUEST',
})

export const GET_ALL_PROJECTS_SUCCESS = (projects) => ({
  type: 'GET_ALL_PROJECTS_SUCCESS',
  payload: projects,
})

export const GET_ALL_PROJECTS_FAILURE = (error) => ({
  type: 'GET_ALL_PROJECTS_FAILURE',
  payload: error,
})

export const getAllProjectAPI = () => (dispatch) => {
  dispatch(GET_ALL_PROJECTS_REQUEST())
  projectService
    .getAllProjects()
    .then((response) => {
      if (response.error) {
        dispatch(GET_ALL_PROJECTS_FAILURE(response.error))
        throw new Error(response.error)
      } else {
        dispatch(GET_ALL_PROJECTS_SUCCESS(response.data.data))
        return response
      }
    })
    .catch((error) => {
      dispatch(GET_ALL_PROJECTS_FAILURE(error))
      throw new Error(error)
    })
}

export const ADD_NEW_PROJECT_REQUEST = () => ({
  type: 'ADD_NEW_PROJECT_REQUEST',
})

export const ADD_NEW_PROJECT_SUCCESS = (project) => ({
  type: 'ADD_NEW_PROJECT_SUCCESS',
  payload: project,
})

export const ADD_NEW_PROJECT_FAILURE = (error) => ({
  type: 'ADD_NEW_PROJECT_FAILURE',
  payload: error,
})

export const addNewProjectAPI = (projectData) => (dispatch) => {
  dispatch(ADD_NEW_PROJECT_REQUEST())
  projectService
    .addNewProject(projectData, dispatch)
    .then((response) => {
      if (response.error) {
        dispatch(ADD_NEW_PROJECT_FAILURE(response.error))
        throw new Error(response.error)
      } else {
        dispatch(ADD_NEW_PROJECT_SUCCESS(response.data.data))
        return response
      }
    })
    .catch((error) => {
      dispatch(ADD_NEW_PROJECT_FAILURE(error))
      throw new Error(error)
    })
}

export const DELETE_PROJECT_REQUEST = () => ({
  type: 'DELETE_PROJECT_REQUEST',
})

export const DELETE_PROJECT_SUCCESS = (projectId) => ({
  type: 'DELETE_PROJECT_SUCCESS',
  payload: projectId,
})

export const DELETE_PROJECT_FAILURE = (error) => ({
  type: 'DELETE_PROJECT_FAILURE',
  payload: error,
})

export const deleteProjectAPI = (projectId) => (dispatch) => {
  dispatch(DELETE_PROJECT_REQUEST())
  projectService
    .deleteProject(projectId, dispatch)
    .then((response) => {
      if (response.error) {
        dispatch(DELETE_PROJECT_FAILURE(response.error))
        throw new Error(response.error)
      } else {
        dispatch(DELETE_PROJECT_SUCCESS(projectId))
        return response
      }
    })
    .catch((error) => {
      dispatch(DELETE_PROJECT_FAILURE(error))
      throw new Error(error)
    })
}
