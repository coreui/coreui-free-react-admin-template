import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { buildUserDTO, buildUserListDTO, userDTO } from '../dto/userDTO';
import { createNewUser, getUserList } from '../components/common/apiCalls';

const initialState = {
    userList: [
        {
            "id": 1,
            "userType": "Admin",
            "name": "Jishnu",
            "officeEmailId": "ji@gmail.com",
            "mobile": "1111111",
            "password": "123456789",
            "confirmPassword": "123456789",
            "customer": "",
            "joiningDate": "2024-12-05",
            "position": "Manager",
            "dateOfBirth": "2024-12-03",
            "status": "Active",
            "language": "English",
            "locked": "Locked"
        }
    ],
    user: userDTO, 
    status: '',
    error: null,
};

// Async Thunk for Fetching User List
export const fetchUserList = createAsyncThunk('user/fetchUserList', async (userObj) => {
    const userList = await getUserList(userObj);
    const response = buildUserListDTO(userList);
    // Await async result
    console.log("Processed User List Response:", response);
    return response; 
});

// Async Thunk for Creating User
export const createUser = createAsyncThunk('user/createUser', async (userObj) => {
    const user = await createNewUser(userObj);
    const response = buildUserDTO(user);    
     // Await async result
    console.log("Processed User Response:", response);
    return response;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        deleteUser: (state, action) => {
            state.userList = state.userList.filter((user) => user.id !== action.payload);
        }       
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userList = action.payload;
                console.log("Updated state.userList:", state.userList);
            })
            .addCase(fetchUserList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error?.message || 'Failed to fetch user list';
            })
            .addCase(createUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createUser.fulfilled, (state, action) => {
                console.log("Payload received in createUser:", action.payload);
                state.status = 'succeeded';
                state.user = action.payload;
                state.userList.push(action.payload);
                console.log("Updated state.user:", state.user);
                console.log("Updated state.userList:", state.userList);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error?.message || 'Failed to create user';
                console.error("Error in createUser:", action.error);
            });
    },
});
export const {  deleteUser } = userSlice.actions;
export default userSlice.reducer;
