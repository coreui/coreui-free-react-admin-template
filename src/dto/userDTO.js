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
    const uDTO = { ...userDTO };
    uDTO.id = user?.Id;
    uDTO.userType = user?.UserType;
    uDTO.name = user?.UserName;
    uDTO.officeEmailId = user?.OfficeEmailId || user?.email;
    uDTO.mobile = user?.Mobile;
    uDTO.password = user?.Password;
    // uDTO.confirmPassword = user?.confirmPassword;
    uDTO.joiningDate = user?.JoiningDate;
    uDTO.consultanType = user?.ConsultanType;
    uDTO.position = user?.Position;
    uDTO.dateOfBirth = user?.DateOfBirth;
    uDTO.status = user?.Status;
    uDTO.language = user?.Language;
    uDTO.customer = user?.Customerid;
    uDTO.locked = user?.Locked;
    console.log("uDTO", uDTO)
    return uDTO;
}

export function buildUserListDTO(users) {
    return users.map(user => buildUserDTO(user));
}