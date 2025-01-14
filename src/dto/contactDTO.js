export const contactDTO = {
    id: null,  
    customerId: null,
    contactName: null,
    email: null,
    phone: null,
    extension: null,
    cellular: null,
    position: null,
    accessPortal: false, 
    sendEmail: false,    
    locked: null,   
    status: false,
    isPrimary: false,    
    createdAt: null,    
    createdBy: null,    
};

export const buildContactDTO = (contact) => {

    console.log("contact: ", contact);

    const contDTO = {...contactDTO};
    contDTO.id = contact?.id; 
    contDTO.customerId = contact?.customerId;     

    contDTO.contactName = contact?.contactName;
    contDTO.email = contact?.email; 
    contDTO.phone = contact?.phone; 
    contDTO.extension = contact?.extension; 
    contDTO.cellular = contact?.cellular;   
    contDTO.position = contact?.position;
    contDTO.accessPortal = contact.accessPortal ? 1: 0;
    contDTO.sendEmail = contact.sendEmail ? 1: 0;
    contDTO.locked = contact?.locked;
    contDTO.status = contact.status ? 1: 0;
    contDTO.isPrimary = contact.isPrimary ? 1: 0;
    contDTO.createdAt = contact?.createdAt;
    contDTO.createdBy = contact?.createdBy;

    console.log("contDTO: ", contDTO);   
    return contDTO;
}

export const buildContactListDTO = (contacts) => {    
    return contacts.map(contact => buildContactDTO(contact));
}   