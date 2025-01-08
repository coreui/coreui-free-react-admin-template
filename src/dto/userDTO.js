export const userDTO = {
    id: null,
    userType: null,
    firstName: null,
    lastName: null, 
    username: null,
    officeEmailId: null,
    mobile: '',
    password: null,
    // confirmPassword: null,
    joiningDate: null,
    consultantType: null,
    position: null,
    dateOfBirth: null,
    status: null,
    language: null,
    customer: null, 
    locked: null,
    created_at: null,
    modifiedat: null,
    createdby: null,    
    modifiedby: null,
};  

export function buildUserDTO(user) {
    console.log("user", user)
    const uDTO = { ...userDTO };
    uDTO.id = user?.Id || user?.id;
    uDTO.userType = user?.UserType || user?.userType;
    uDTO.firstName = user?.FirstName || user?.firstName;
    uDTO.lastName = user?.LastName || user?.lastName;
    uDTO.username = user?.UserName|| user?.username;
    uDTO.officeEmailId = user?.OfficeEmailId || user?.officeEmailId;
    uDTO.mobile = user?.Mobile || user?.mobile;
    uDTO.password = user?.Password || user?.password    ;
    // uDTO.confirmPassword = user?.confirmPassword;
    uDTO.joiningDate = user?.JoiningDate || user?.joiningDate;
    uDTO.consultantType = user?.ConsultantType || user?.consultantType;
    uDTO.position = user?.Position || user?.position;
    uDTO.dateOfBirth = user?.DateOfBirth || user?.dateOfBirth;
    uDTO.status = user?.Status || user?.status;
    uDTO.language = user?.Language || user?.language;
    uDTO.customer = user?.Customerid === null ? user?.customerName?.id : user?.Customerid;
    uDTO.locked = user?.Locked || user?.locked;
    uDTO.created_at = user?.Created_at || user?.created_at;
    uDTO.modifiedat = user?.Modifiedat || user?.modifiedat;
    uDTO.createdby = user?.Createdby || user?.createdby;
    uDTO.modifiedby = user?.Modifiedby || user?.modifiedby;
    console.log("uDTO", uDTO)
    return uDTO;
}

export function buildUserListDTO(users) {
    return users.map(user => buildUserDTO(user));
}