import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { buildUserDTO, buildUserListDTO, userDTO } from '../dto/userDTO';
import { createNewUser, deleteUser, getSingleUser, getUserList, updateUser } from '../components/common/apiCalls';
import { Api_Status } from '../components/common/utils';

const initialState = {
    userList: [
        // {
        //     "id": 2,
        //     "userType": "Admin",
        //     "name": "Jishnu",
        //     "officeEmailId": "ji@gmail.com",
        //     "mobile": "1111111",
        //     "password": "123456789",
        //     "confirmPassword": "123456789",
        //     "customer": "",
        //     "joiningDate": "2024-12-05",
        //     "position": "Manager",
        //     "dateOfBirth": "2024-12-03",
        //     "status": "Active",
        //     "language": "English",
        //     "locked": "Locked"
        // }
    ],
    user: userDTO, 
    status: '',
    error: null,

};

// Async Thunk for Fetching User List
export const fetchUserList = createAsyncThunk('user/fetchUserList', async (userQueries) => {
    const response = await getUserList(userQueries);
    console.log("User List Response:", response);   
    // Await async result
    // console.log("Processed User List Response:", response);
    return response; 
});

//Async Thunk for Fetching Single User
 export const fetchSingleUser = createAsyncThunk('user/fetchSingleUser', async (obj) => {
    const user = await getSingleUser(obj);
    console.log("Processed User Response:", user);
    return user;
});

// Async Thunk for Creating User
export const createUser = createAsyncThunk('user/createUser', async (userObj) => {
    const user = await createNewUser(userObj);
       
     // Await async result
    console.log("Processed User Response:", user);
    return user;
});

export const updateExistingUser = createAsyncThunk('user/updateExistingUser', async (userObj) => {
    const user = await updateUser(userObj);
    console.log("Processed User Response:", user);
    return user;
});

export const deleteAUser = createAsyncThunk('user/deleteAUser', async (obj) => {
    const user = await deleteUser(obj);
    console.log("Processed User Response:", user);
    return user;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // deleteUser: (state, action) => {
        //     state.userList = state.userList.filter((user) => user.id !== action.payload);
        // }       
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserList.pending, (state) => {
                state.status = Api_Status.Loading;
            })
            .addCase(fetchUserList.fulfilled, (state, action) => {
                state.status = Api_Status.Succeeded;
                console.log("Payload received in fetchUserList:", action.payload)
                state.userList = buildUserListDTO(action.payload);
                console.log("Updated state.userList:", state.userList);
            })
            .addCase(fetchUserList.rejected, (state, action) => {
                state.status = Api_Status.Failed;
                state.error = action.error?.message || 'Failed to fetch user list';
            })
            .addCase(createUser.pending, (state) => {
                state.status = Api_Status.Loading;
            })
            .addCase(fetchSingleUser.pending, (state) => {
                state.status = Api_Status.Loading;
            })
            .addCase(fetchSingleUser.fulfilled, (state, action) => {
                state.status = Api_Status.Succeeded;
                console.log("Payload received in fetchSingleUser:", action.payload);
                state.user = buildUserListDTO(action.payload);
                console.log("Updated state.user:", state.user);
            })
            .addCase(fetchSingleUser.rejected, (state, action) => {
                state.status = Api_Status.Failed;
                state.error = action.error?.message || 'Failed to fetch user';
            })
            .addCase(createUser.fulfilled, (state, action) => {
                console.log("Payload received in createUser:", action.payload);
                state.status = Api_Status.Succeeded;
                console.log("action.payload:", action.payload); 
                state.user = buildUserDTO(action.payload);
                console.log("Updated state.user:", state.user);
                console.log("Updated state.userList:", state.userList);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = Api_Status.Failed;
                state.error = action.error?.message || 'Failed to create user';
                console.error("Error in createUser:", action.error);
            })
            .addCase(updateExistingUser.pending, (state) => {
                state.status = Api_Status.Loading;
            })
            .addCase(updateExistingUser.fulfilled, (state, action) => {
                console.log("Payload received in updateExistingUser:", action.payload);
                state.status = Api_Status.Succeeded;
                state.user = buildUserListDTO(action.payload);
                console.log("Updated state.user:", state.user);
                
            })
            .addCase(updateExistingUser.rejected, (state, action) => {
                state.status = Api_Status.Failed;
                state.error = action.error?.message || 'Failed to update user';
                console.error("Error in updateExistingUser:", action.error);
            })
            .addCase(deleteAUser.pending, (state) => {
                state.status = Api_Status.Loading;
            })
            .addCase(deleteAUser.fulfilled, (state, action) => {
                console.log("Payload received in deleteAUser:", action.payload);
                state.status = Api_Status.Succeeded;
                //state.user = buildUserDTO(action.payload);
                console.log("Updated state.user:", state.user);
                console.log("Updated state.userList:", state.userList);
            })
            .addCase(deleteAUser.rejected, (state, action) => {
                state.status = Api_Status.Failed;
                state.error = action.error?.message || 'Failed to delete user';
                console.error("Error in deleteAUser:", action.error);
            });
    },
});
// export const { deleteUser } = userSlice.actions;
export default userSlice.reducer;
