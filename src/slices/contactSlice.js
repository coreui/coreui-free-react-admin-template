import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { buildContactDTO, buildContactListDTO, contactDTO } from '../dto/contactDTO';
import { createNewContact, getContactList, getSingleContact, updateContact } from '../components/common/apiCalls';
import { Api_Status } from '../components/common/utils';

const initialState = {
    contactList: [],
    contact: contactDTO,
    status: Api_Status.Idle,
    error: null,
    reloadList: Api_Status.Idle,  
    loading: false        
};

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (contacts) => {
    const contactList = await getContactList(contacts);   
    const response = await buildContactListDTO(contactList);  
    console.log("Processed contacts list: ", response); 
    return response;
})

export const addNewContact = createAsyncThunk('contacts/addNewContact', async (contact) => { 

    const newContact = await createNewContact(contact); 
    console.log("newContact: ", newContact);     
    const response = await buildContactDTO(newContact);
    return response;
}) 

export const updateExistingContact = createAsyncThunk('contacts/updateExistingContact', async (contact) => {    
    const updatedContact = await updateContact(contact);
    console.log("updatedContact: ", updatedContact);
    const response = await buildContactDTO(updatedContact);
    return response;
})

export const fetchSingleContact = createAsyncThunk('contacts/fetchSingleContact', async (contactObj) => {  
    const contact = await getSingleContact(contactObj);  
    console.log("contact: ", contact);
    const response = await buildContactListDTO(contact);
    return response;
})

export const deleteAContact = createAsyncThunk('contacts/deleteAContact', async (contactObj) => { 
    const contact = await deleteContact(contactObj);
    console.log("contact: ", contact);
    return contact;
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
                state.loading = true;       
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.status = Api_Status.Succeeded;
                state.loading = false;
                state.contactList = action.payload;
                console.log("Updated state.contactList: ", state.contactList);
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.status = Api_Status.Failed;   
                state.error = action.error.message || 'Failed to fetch contacts';
                state.loading = false;

            })
            .addCase(addNewContact.pending, (state) => {
                state.loading = true;
                state.status = Api_Status.Loading;
                state.reloadList = Api_Status.Loading;  
                state.error = null; 
            })
            .addCase(addNewContact.fulfilled, (state, action) => {
                state.loading = false;
                state.status = Api_Status.Succeeded;
                state.reloadList = Api_Status.Succeeded;
                state.contact = action.payload;
                console.log("Updated state.contact: ", state.contact);
            })
            .addCase(addNewContact.rejected, (state, action) => {
                state.status = Api_Status.Failed;
                state.reloadList = Api_Status.Failed;
                state.loading = false;
                state.error = action.error?.message || 'Failed to create contact';
            })
            .addCase(updateExistingContact.pending, (state) => {    
                state.loading = true;
                state.status = Api_Status.Loading;
                state.reloadList = Api_Status.Loading;
                state.error = null;
            })
            .addCase(updateExistingContact.fulfilled, (state, action) => {
                state.loading = false;
                state.status = Api_Status.Succeeded;
                state.reloadList = Api_Status.Succeeded;
                state.contact = action.payload;
                console.log("Updated state.contact: ", state.contact);
            })
            .addCase(updateExistingContact.rejected, (state, action) => {
                state.status = Api_Status.Failed;
                state.reloadList = Api_Status.Failed;
                state.loading = false;
                state.error = action.error?.message || 'Failed to update contact';
            })
            .addCase(fetchSingleContact.pending, (state) => {
                state.loading = true;
                state.status = Api_Status.Loading;
                state.error = null;
            })
            .addCase(fetchSingleContact.fulfilled, (state, action) => {
                state.loading = false;
                state.status = Api_Status.Succeeded;
                state.contact = action.payload;
                console.log("Updated state.contact: ", state.contact);
            })
            .addCase(fetchSingleContact.rejected, (state, action) => {
                state.status = Api_Status.Failed;
                state.loading = false;
                state.error = action.error?.message || 'Failed to fetch contact';
            })
            .addCase(deleteAContact.pending, (state) => {
                state.loading = true;
                state.status = Api_Status.Loading;
                state.reloadList = Api_Status.Loading;
                state.error = null;
            })
            .addCase(deleteAContact.fulfilled, (state, action) => {
                state.loading = false;
                state.status = Api_Status.Succeeded;
                state.reloadList = Api_Status.Succeeded;
                // state.contact = action.payload;
                console.log("Updated state.contact: ", state.contact);
            })
            .addCase(deleteAContact.rejected, (state, action) => {
                state.status = Api_Status.Failed;
                state.reloadList = Api_Status.Failed;
                state.loading = false;
                state.error = action.error?.message || 'Failed to delete contact';
            })


    }
});

export const { deleteContact } = contactSlice.actions;

export default contactSlice.reducer;