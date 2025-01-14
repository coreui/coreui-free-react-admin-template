import { buildConnectionDTO, buildConnectionDTOList } from "./connectionDTO";

export const customerDTO = {
    id: -1,
    customerName: null,
    contactPerson: null,
    customerNameHebrew: null,
    email: null,
    phoneNumber: null,
    country: null,
    projectType: null,
    siteLocation: null,
    distanceInKm: null,
    sapVersion: null,
    sapCode: null,
    controlCenterUser: null,
    controlCenterPass: null,
    installationCredentials: null,
    connections: [], // Corrected to use an array for connections
    contacts: [], // Added a proper array for contactDto
 
}

export const customerListDTO = {
    id: 1,
    customerName: null,
    contactPerson: null,
    customerNameHebrew: null,
    email: null,
    phoneNumber: null,
    country: null,
    siteLocation: null,
    distanceInKm: null,
    sapVersion: null,
    sapCode: null,
    controlCenterUser: null,
    controlCenterPass: null,
}

export function buildCustomerDTO(customer, connections) {
    //let id = 1;
    const cDTO = {...customerDTO};
   // cDTO.id = id + 1;
    cDTO.customerName = customer?.customerName;
    cDTO.contactPerson = customer?.contactPerson;
    cDTO.customerNameHebrew = customer?.customerNameHebrew;
    cDTO.email = customer?.email;
    cDTO.phoneNumber = customer?.phoneNumber;
    cDTO.country = customer?.country;
    cDTO.projectType = customer?.projectType;
    cDTO.siteLocation = customer?.siteLocation;
    cDTO.distanceInKm = customer?.distanceInKm;
    cDTO.sapVersion = customer?.sapVersion;
    cDTO.sapCode = customer?.sapCode;
    cDTO.controlCenterUser = customer?.controlCenterUser;
    cDTO.controlCenterPass = customer?.controlCenterPass;
    cDTO.installationCredentials = customer?.installationCredentials;
    cDTO.connections = connections ? buildConnectionDTOList(connections) : null;

    console.log("cDTO", cDTO);

    return cDTO;
}

export function buildCustomerListDTO(customers) {
    return customers.map(customer => {
        // buildCustomerDTO(customer));
        const cuLDTO = {...customerListDTO};
        cuLDTO.id = customer?.id;
        cuLDTO.customerName = customer?.customerName;
        cuLDTO.contactPerson = customer?.contactPerson;
        cuLDTO.customerNameHebrew = customer?.customerNameHebrew;
        cuLDTO.email = customer?.email;
        cuLDTO.phoneNumber = customer?.phoneNumber;
        cuLDTO.country = customer?.country;
        cuLDTO.siteLocation = customer?.siteLocation;  
        cuLDTO.distanceInKm = customer?.distanceInKm;   
        cuLDTO.sapVersion = customer?.sapVersion;
        cuLDTO.sapCode = customer?.sapCode;
        cuLDTO.controlCenterUser = customer?.controlCenterUser;
        cuLDTO.controlCenterPass = customer?.controlCenterPass; 

        return cuLDTO;
    });
};
