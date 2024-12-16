import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { buildContactDTO, buildContactListDTO, contactDTO } from '../dto/contactDTO';
import { createNewContact, getContactList } from '../components/common/apiCalls';

const initialState = {
    contactList: [],
    contact: contactDTO,
    status: 'idle',
    error: null,
};

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (contacts) => {
    const contactList = await getContactList(contacts);   
    const response = await buildContactListDTO(contactList);   
    return response;
})

export const addNewContact = createAsyncThunk('contacts/addNewContact', async (contact) => { 

    const newContact = await createNewContact(contact); 
    console.log("newContact: ", newContact);     
    const response = await buildContactDTO(newContact);
    return response;
})  


const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        deleteContact: (state, action) => {
            state.contactList = state.contactList.filter((contact) => contact.id !== action.payload);
        }   
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
                console.log("contactList: ", state.contactList);    
            })
            .addCase(addNewContact.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { deleteContact } = contactSlice.actions;

export default contactSlice.reducer;