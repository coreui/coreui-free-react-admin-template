export const userDTO = {
    id: null,
    userType: null,
    name: null,
    officeEmailId: null,
    mobile: '',
    password: null,
    confirmPassword: null,
    joiningDate: null,
    consultanType: null,
    position: null,
    dateOfBirth: null,
    status: null,
    language: null,
    customer: null, 
    locked: null,
};  

export function buildUserDTO(user) {
    console.log("user", user)
    let id = 1;
    const uDTO = { ...userDTO };
    uDTO.id = id + 1;
    uDTO.userType = user?.userType;
    uDTO.name = user?.name;
    uDTO.officeEmailId = user?.officeEmailId;
    uDTO.mobile = user?.mobile;
    uDTO.password = user?.password;
    uDTO.confirmPassword = user?.confirmPassword;
    uDTO.joiningDate = user?.joiningDate;
    uDTO.consultanType = user?.consultanType;
    uDTO.position = user?.position;
    uDTO.dateOfBirth = user?.dateOfBirth;
    uDTO.status = user?.status;
    uDTO.language = user?.language;
    uDTO.customer = user?.customer;
    uDTO.locked = user?.locked;
    console.log("uDTO", uDTO)
    return uDTO;
}

export function buildUserListDTO(users) {
    return users.map(user => buildUserDTO(user));
}