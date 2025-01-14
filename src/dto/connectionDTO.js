export const connectionDTO = {
    id: null,
    connectionType: null,
    vpnType: null,
    address: null,
    user: null,
    password: null,
    comments: null,
    status: true,
    createdAt: null,
    modifiedAt: null,
    createdBy: null,    
    modifiedBy: null,
}

export function buildConnectionDTO(connectionObj) {
    const connDTO = {...connectionDTO};
    let id = 1
    connDTO.id = connectionObj?.id || id++;
    connDTO.connectionType = connectionObj?.connectionType;
    connDTO.vpnType = connectionObj?.vpnType;
    connDTO.address = connectionObj?.address;
    connDTO.user = connectionObj?.user;
    connDTO.password = connectionObj?.password;
    connDTO.comments = connectionObj?.comments;
    connDTO.status = connectionObj?.status;
    connDTO.createdAt = connectionObj?.createdAt;
    connDTO.modifiedAt = connectionObj?.modifiedAt;
    connDTO.createdBy = connectionObj?.createdBy;
    connDTO.modifiedBy = connectionObj?.modifiedBy;
    return connDTO;
}

export function buildConnectionDTOList(connectionList) {
    return connectionList.map((connection) => buildConnectionDTO(connection));  
}