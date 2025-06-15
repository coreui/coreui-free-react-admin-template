import axios from 'axios'
import { toast } from 'react-toastify'
import { getAllProjectAPI } from '../actions/projectActions'

const API_URL = 'http://localhost:8081/project/'

const getAllProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}getAllProject`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response
  } catch (error) {
    console.error('Error fetching all config Jira:', error)
    return error
  }
}

const addNewProject = async (projectData, dispatch) => {
  try {
    const response = await axios.post(`${API_URL}addNewProject`, projectData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (response.status === 201 && !response.data.error) {
      toast.success(response.data.message || 'Project added successfully')
      if (dispatch) {
        setTimeout(() => {
          dispatch(getAllProjectAPI())
        }, 1000)
      }
    }
    return response
  } catch (error) {
    console.error('Error adding new project:', error)
    toast.error(error.response?.data?.message || 'Failed to add new project')
    return error
  }
}

const deleteProject = async (projectId, dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}deleteProjectByID`,
      { ids: projectId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    if (response.status === 200 && !response.data.error) {
      toast.success(response.message || 'Project deleted successfully')
      if (dispatch) {
        setTimeout(() => {
          dispatch(getAllProjectAPI())
        }, 1000)
      }
    }
    return response
  } catch (error) {
    console.error('Error deleting project:', error)
    toast.error(error.response?.data?.message || 'Failed to delete project')
    return error
  }
}

const editProject = async (projectId, projectData, dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}updateProjectByID`,
      { projectId, projectData },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    if (response.status === 200 && !response.data.error) {
      toast.success(response.data.message || 'Project edited successfully')
      if (dispatch) {
        setTimeout(() => {
          dispatch(getAllProjectAPI())
        }, 1000)
      }
    }
    return response
  } catch (error) {
    console.error('Error editing project:', error)
    toast.error(error.response?.data?.message || 'Failed to edit project')
    return error
  }
}
export default {
  getAllProjects,
  addNewProject,
  deleteProject,
  editProject,
}
