import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { buildCustomerDTO, buildCustomerListDTO, customerDTO } from '../dto/customerDTO';
import { createNewCustomer, deleteCustomer, getCustomerList, getSingleCustomer, updateCustomer } from '../components/common/apiCalls';
import { Api_Status } from '../components/common/utils';

const initialState = {
    customerList: [],
    customer: customerDTO,
    status: '',
    loading: false,
    error: null,
    reloadList: Api_Status.Idle,
};

// Async Thunk for creating a new customer
export const createCustomer = createAsyncThunk('customer/createCustomer', async (customerObj) => {
    console.log("Creating Customer:", customerObj);
    // const cDTO =  buildCustomerDTO(customerObj, connections);
    const response = await createNewCustomer(customerObj);  
   
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

//Async Thunk for Fetching Single Customer  
export const fetchSingleCustomer = createAsyncThunk('customer/fetchSingleCustomer', async (obj) => {
    const customer = await getSingleCustomer(obj);
    const response = await buildCustomerListDTO(customer);
    console.log("Processed Customer Response:", response);
    return response;   
}); 

//Async Thunk for updating customer 
export const updateExistingCustomer = createAsyncThunk('customer/updateExistingCustomer', async (customerObj) => {  
    console.log("Updating Customer:", customerObj);
    const updatedCustomer = await updateCustomer(customerObj);
    const response = await buildCustomerDTO(updateCustomer);
    console.log("Processed Customer Response:", response);
    return response;
});

//Async thunk for deleting customer 
export const deleteExistingCustomer = createAsyncThunk('customer/deleteExistingCustomer', async (obj) => {
    const response = await deleteCustomer(obj); 
    console.log("Processed Customer Response:", response);
    return response;
});  






const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        // deleteCustomer: (state, action) => {    
        //     state.customerList = state.customerList.filter((customer) => customer.id !== action.payload);
        // },

    },
    extraReducers: (builder) => {
        builder
            .addCase(createCustomer.pending, (state) => {
                state.loading = true;
                state.reloadList = Api_Status.Loading;  
                state.error = null;
                state.status = 'loading';
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.status = Api_Status.Succeeded;
                state.reloadList = Api_Status.Succeeded;
                state.customer = action.payload;
                state.customerList.push(action.payload);
                console.log("Updated state.customer:", state.customer);
                console.log("Updated state.customerList:", state.customerList);
            })
            .addCase(createCustomer.rejected, (state, action) => {
                state.status = Api_Status.Failed;
                state.reloadList = Api_Status.Failed;
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
            })
            .addCase(fetchSingleCustomer.pending, (state) => {  
                state.loading = true;
                state.error = null;
                state.status = Api_Status.Loading;  
            })
            .addCase(fetchSingleCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.status = Api_Status.Succeeded;
                state.customer = action.payload;
                console.log("customer by their id, state.customer:", state.customer);
            })
            .addCase(fetchSingleCustomer.rejected, (state, action) => {
                state.status = Api_Status.Failed;
                state.loading = false;
                state.error = action.error?.message || 'Failed to fetch customer';
                console.error("Error in fetchSingleCustomer:", action.error);
            })
            .addCase(updateExistingCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = Api_Status.Loading;
                state.reloadList = Api_Status.Loading;  
            }) 
            .addCase(updateExistingCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.status = Api_Status.Succeeded;
                state.reloadList = Api_Status.Succeeded;
                state.customer = action.payload;
                console.log("Updated state.customer:", state.customer);
            }) 
            .addCase(updateExistingCustomer.rejected, (state, action) => {
                state.status = Api_Status.Failed;
                state.reloadList = Api_Status.Failed;
                state.loading = false;
                state.error = action.error?.message || 'Failed to update customer';
                console.error("Error in updateExistingCustomer:", action.error);
            })
            .addCase(deleteExistingCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = Api_Status.Loading;
                state.reloadList = Api_Status.Loading;
            })
            .addCase(deleteExistingCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.status = Api_Status.Succeeded;
                state.reloadList = Api_Status.Succeeded;
                //state.customer = action.payload;
                console.log("Updated state.customer:", state.customer);
            })
            .addCase(deleteExistingCustomer.rejected, (state, action) => {
                state.status = Api_Status.Failed;
                state.reloadList = Api_Status.Failed;
                state.loading = false;
                state.error = action.error?.message || 'Failed to delete customer';
                console.error("Error in deleteExistingCustomer:", action.error);
            })
    }
});

// export const { deleteCustomer } = customerSlice.actions;    
export default customerSlice.reducer;