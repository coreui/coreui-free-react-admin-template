import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { buildConnectionDTO } from '../dto/connectionDTO';
import { createNewConnection } from '../components/common/apiCalls';

const initialState = {
    connectionList: [],
    connection: null,
    status: '', 
    loading: false,
    error: null,
};

//Async Thunk for creating a new connection
export const createConnection = createAsyncThunk('connection/createConnection', async (connectionObj) => {
    const newConnection = await createNewConnection(connectionObj); 
    const response = await buildConnectionDTO(newConnection);
    console.log("Processed Connection Response:", response);
    return response;
});

const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
        deleteConnection: (state, action) => {
            state.connectionList = state.connectionList.filter((connection) => connection.id !== action.payload);
        }   
    },
    extraReducers: (builder) => {
        builder
            .addCase(createConnection.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(createConnection.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.connection = action.payload;
                state.connectionList.push(action.payload);
                console.log("Updated state.connection:", state.connection); 
                console.log("Updated state.connectionList:", state.connectionList); 
            })
            .addCase(createConnection.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.error?.message || 'Failed to create connection';
                console.error("Error in createConnection:", action.error);
            });
    }

});

export const { deleteConnection } = connectionSlice.actions;    
export default connectionSlice.reducer;