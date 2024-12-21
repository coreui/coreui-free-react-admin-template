export const connectionDTO = {
    id: 1,
    connectionType: null,
    vpnType: null,
    address: null,
    user: null,
    password: null,
    comments: null,
}

export function buildConnectionDTO(connectionObj) {
    let id = 1;
    const connDTO = {...connectionDTO};
    connDTO.id = id + 1;
    connDTO.connectionType = connectionObj?.connectionType;
    connDTO.vpnType = connectionObj?.vpnType;
    connDTO.address = connectionObj?.address;
    connDTO.user = connectionObj?.user;
    connDTO.password = connectionObj?.password;
    connDTO.comments = connectionObj?.comments;
    return connDTO;
}

export function buildConnectionDTOList(connectionList) {
    return connectionList.map((connection) => buildConnectionDTO(connection));  
}