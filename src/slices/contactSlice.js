import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { buildContactDTO, buildContactListDTO, contactDTO } from '../dto/contactDTO';

const initialState = {
    contactList: [],
    contact: contactDTO,
    status: 'idle',
    error: null,
};

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (contacts) => {
    const response = await buildContactListDTO(contacts);   
    return response;
})

export const addNewContact = createAsyncThunk('contacts/addNewContact', async (contact) => {    
    const response = await buildContactDTO(contact);
    return response;
})  


const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.contactList = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewContact.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addNewContact.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.contact = action.payload;
                state.contactList.push(action.payload);
            })
            .addCase(addNewContact.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { addContact, removeContact, updateContact } = contactSlice.actions;

export default contactSlice.reducer;