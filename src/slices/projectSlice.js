import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { buildProjectDTO, buildProjectListDTO, projectDTO } from '../dto/projectDTO';
import { createNewProject, getProjectList } from '../components/common/apiCalls';

const initialState = {
    projectList: [],
    project: projectDTO,
    status: 'idle',
    error: null,
};

// Async thunk for fetching the project list
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (projects) => {
    const projectList = await getProjectList(projects); 
    const response = await buildProjectListDTO(projectList);
    return response;
});

// Async thunk for adding a new project
export const addNewProject = createAsyncThunk('projects/addNewProject', async (newProject) => {
    const project = await createNewProject(newProject);      
    const response = await buildProjectDTO(project);     
    return response;
});

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        deleteProject: (state, action) => {
            state.projectList = state.projectList.filter((project) => project.id !== action.payload);
        }   
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.projectList = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewProject.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addNewProject.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.project = action.payload;
                state.projectList.push(action.payload);
            })
            .addCase(addNewProject.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const { deleteProject } = projectSlice.actions;
export default projectSlice.reducer;