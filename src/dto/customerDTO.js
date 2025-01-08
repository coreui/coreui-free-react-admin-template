import { buildConnectionDTO, buildConnectionDTOList } from "./connectionDTO";

export const customerDTO = {
    id: 1,
    customerName: null,
    contactPerson: null,
    customerNameInEnglish: null,
    email: null,
    phoneNumber: null,
    country: null,
    projectType: null,
    siteLocation: null,
    distanceInKm: null,
    SAPVersion: null,
    SAPCode: null,
    controlCenterUser: null,
    controlCenterPass: null,
    installationCredentials: null,
    connections: null,
    //List<contactDto> contacts:null,
    //list of contactDto
    //List of ConnectionDto
}

export const customerListDTO = {
    id: 1,
    customerName: null,
    contactPerson: null,
    customerNameInEnglish: null,
    email: null,
    phoneNumber: null,
    country: null,
}

export function buildCustomerDTO(customer, connections) {
    let id = 1;
    const cDTO = {...customerDTO};
    cDTO.id = id + 1;
    cDTO.customerName = customer?.customerName;
    cDTO.contactPerson = customer?.contactPerson;
    cDTO.customerNameInEnglish = customer?.customerNameInEnglish;
    cDTO.email = customer?.email;
    cDTO.phoneNumber = customer?.phoneNumber;
    cDTO.country = customer?.country;
    cDTO.projectType = customer?.projectType;
    cDTO.siteLocation = customer?.siteLocation;
    cDTO.distanceInKm = customer?.distanceInKm;
    cDTO.SAPVersion = customer?.SAPVersion;
    cDTO.SAPCode = customer?.SAPCode;
    cDTO.controlCenterUser = customer?.controlCenterUser;
    cDTO.controlCenterPass = customer?.controlCenterPass;
    cDTO.installationCredentials = customer?.installationCredentials;
    cDTO.connections = connections ? buildConnectionDTOList(connections) : null;

    return cDTO;
}

export function buildCustomerListDTO(customers) {
    return customers.map(customer => {
        // buildCustomerDTO(customer));
        const cuLDTO = {...customerListDTO};
        cuLDTO.id = customer?.id;
        cuLDTO.customerName = customer?.customerName;
        cuLDTO.contactPerson = customer?.contactPerson;
        cuLDTO.customerNameInEnglish = customer?.customerNameInEnglish;
        cuLDTO.email = customer?.email;
        cuLDTO.phoneNumber = customer?.phoneNumber;
        cuLDTO.country = customer?.country;

        return cuLDTO;
    });
}