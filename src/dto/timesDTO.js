
export const timeSheetObjDTO = {
    id: 0,
    customer: null,
    taskDate: null, 
    task: null, 
    startTime: null,    
    description: null,
    endTime: null,  
    approvedHours: null,    
    remainingHours: null,   
    totalTime: null,
    totalWorkingTime: null, 
    contactPerson: null,
    user: null,
    internalNotes: null,
    status: null,
    allUsers: null,
}

export const buildTimeSheetObjDTO = (timeSheetObj) => { 
    const timeDTO = {...timeSheetObjDTO};   
    let id = 1;
    timeDTO.id = id + 1;
    timeDTO.customer = timeSheetObj?.customer;
    timeDTO.taskDate = timeSheetObj?.taskDate;  
    timeDTO.task = timeSheetObj?.task;  
    timeDTO.startTime = timeSheetObj?.startTime;    
    timeDTO.description = timeSheetObj?.description;    
    timeDTO.endTime = timeSheetObj?.endTime;    
    timeDTO.approvedHours = timeSheetObj?.approvedHours;    
    timeDTO.remainingHours = timeSheetObj?.remainingHours;  
    timeDTO.totalTime = timeSheetObj?.totalTime;    
    timeDTO.totalWorkingTime = timeSheetObj?.totalWorkingTime;  
    timeDTO.contactPerson = timeSheetObj?.contactPerson;    
    timeDTO.user = timeSheetObj?.user;  
    timeDTO.internalNotes = timeSheetObj?.internalNotes;    
    timeDTO.status = timeSheetObj?.status;  
    timeDTO.allUsers = timeSheetObj?.allUsers;  
    return timeDTO; 
    
}

export const buildTimeSheetObjDTOList = (timeSheetObjList) => {
    return timeSheetObjList.map((timeSheetObj) => {
        return buildTimeSheetObjDTO(timeSheetObj);
    });
}   