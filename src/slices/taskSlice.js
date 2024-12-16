import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { buildTaskDTO, buildTaskListDTO, buildTaskListsDTO, taskDTO } from '../dto/taskDTO';
import { createNewTask } from '../components/common/apiCalls';


// Initial State    
const initialState = {
    taskList: [],
    task: taskDTO,
    loading: false,
    error: null,
};  

// Thunks
export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (taskData, { rejectWithValue }) => {
        console.log('Task Data:', taskData);
        try {
            const newTask = await createNewTask(taskData);  
            const response = await buildTaskDTO(newTask);  
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchTaskList = createAsyncThunk(
    'tasks/fetchTaskList',
    async (_, { rejectWithValue }) => {
        try {
            return initialState.taskList;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Slice
const taskSlice = createSlice({
    name: 'task',
    initialState: initialState, 
    reducers: {
        deleteTask: (state, action) => {
            state.taskList = state.taskList.filter((task) => task.id !== action.payload);
        }   
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                const data = buildTaskListDTO(action.payload); 
                state.taskList.push(data);  
                console.log('Task created successfully!', state.taskList); 
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchTaskList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTaskList.fulfilled, (state, action) => {
                state.loading = false;
                state.taskList = buildTaskListsDTO(action.payload);
            })
            .addCase(fetchTaskList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { deleteTask } = taskSlice.actions;
export default taskSlice.reducer;