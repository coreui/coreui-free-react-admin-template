import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { buildCustomerDTO, buildCustomerListDTO, customerDTO } from '../dto/customerDTO';
import { createNewCustomer, getCustomerList } from '../components/common/apiCalls';

const initialState = {
    customerList: [],
    customer: customerDTO,
    status: '',
    loading: false,
    error: null,
};

// Async Thunk for creating a new customer
export const createCustomer = createAsyncThunk('customer/createCustomer', async ({ customerObj, connections }) => {
    console.log("Creating Customer:", customerObj);
    console.log("Creating Customer Connections:", connections);
    const newCustomer = await createNewCustomer(customerObj, connections);  
    const response = await buildCustomerDTO(newCustomer.customerObj, newCustomer.connections);
    console.log("Processed Customer Response:", response);
    return response;
});

// Async Thunk for fetching the customer list
export const fetchCustomerList = createAsyncThunk('customer/fetchCustomerList', async (customers) => {
    console.log("Fetching Customer List");
    const customerList = await getCustomerList(customers);
    const response = await buildCustomerListDTO(customerList);
    console.log("Processed Customer List Response:", response);
    return response;
});


const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        deleteCustomer: (state, action) => {    
            state.customerList = state.customerList.filter((customer) => customer.id !== action.payload);
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(createCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.customer = action.payload;
                state.customerList.push(action.payload);
                console.log("Updated state.customer:", state.customer);
                console.log("Updated state.customerList:", state.customerList);
            })
            .addCase(createCustomer.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.error?.message || 'Failed to create user';
                console.error("Error in createUser:", action.error);
            })
            .addCase(fetchCustomerList.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(fetchCustomerList.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.customerList = action.payload;
                console.log("Updated state.customerList:", state.customerList);
            })
            .addCase(fetchCustomerList.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.error?.message || 'Failed to fetch customer list';
                console.error("Error in fetchCustomerList:", action.error);
            });
    }
});

export const { deleteCustomer } = customerSlice.actions;    
export default customerSlice.reducer;