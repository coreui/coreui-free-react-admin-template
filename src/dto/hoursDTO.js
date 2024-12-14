export const hoursDTO = {
    id: 0,
    orderNum: null,
    hours: null,    
    user: null, 
    dateTime: new Date().toLocaleDateString(),   
    comment: null,  
};

export const buildHoursDTO = (hourObj) => {  
    const hDTO = {...hoursDTO}; 
    let id = 1;
    hDTO.id = id + 1;   
    hDTO.orderNum = hourObj?.orderNum;  
    hDTO.hours = hourObj?.hours;    
    hDTO.user = hourObj?.user;
    hDTO.comment = hourObj?.comment;

    console.log('hDTO: ', hDTO);
    return hDTO; 
};

export const buildHoursDTOList = (hoursList) => {
    return hoursList.map((hourObj) => buildHoursDTO(hourObj));  
}   

