import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { buildProjectDTO, buildProjectListDTO, projectDTO } from '../dto/projectDTO';

const initialState = {
    projectList: [],
    project: projectDTO,
    status: 'idle',
    error: null,
};

// Async thunk for fetching the project list
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (projects) => {
    const response = await buildProjectListDTO(projects);
    return response;
});

// Async thunk for adding a new project
export const addNewProject = createAsyncThunk('projects/addNewProject', async (newProject) => {
    const response = await buildProjectDTO(newProject); 
    return response;
});

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
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

export default projectSlice.reducer;