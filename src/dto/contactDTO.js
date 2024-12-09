export const contactDTO = {
    id: null,   
    contactName: null,
    email: null,
    phone: null,
    extension: null,
    cellular: null,
    position: null,
};

export const buildContactDTO = (contact) => {

    const contDTO = {...contactDTO};
    let id = 1;
    contDTO.id = id + 1;
    contDTO.contactName = contact?.contactName;
    contDTO.email = contact?.email; 
    contDTO.phone = contact?.phone; 
    contDTO.extension = contact?.extension; 
    contDTO.cellular = contact?.cellular;   
    contDTO.position = contact?.position;   
    return contDTO;
}

export const buildContactListDTO = (contacts) => {    
    return contacts.map(contact => buildContactDTO(contact));
}   