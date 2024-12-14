export const taskDTO = {   
    id: 0,
    ticketNumber: null,
    customer: null,
    module: null,
    contactName: null,
    form: null,
    projectName: null,
    subject: null, // Only for customer
    attachment: null,
    status: null,
    approvedHours: null,
    balanceHours: null,
    priority: null,
    detailDescription: null,
    user: null,
};

export const taskListDTO = {    
    id: 0,
    ticketNumber: null,
    customer: null,
    contactName: null,
    projectName: null,
    subject: null, // Only for customer
    attachment: null,
    status: null,
    approvedHours: null,
    balanceHours: null,
    priority: null,
    detailDescription: null,
    user: null,
};

export const buildTaskDTO = (task) => {     
    const tDTO = {...taskDTO}   
    let id = 1;
    tDTO.id = id + 1;
    tDTO.ticketNumber = task?.ticketNumber;
    tDTO.customer = task?.customer;
    tDTO.module = task?.module;
    tDTO.contactName = task?.contactName;
    tDTO.form = task?.form;
    tDTO.projectName = task?.projectName;
    tDTO.subject = task?.subject;
    tDTO.attachment = task?.attachment?.name;
    tDTO.status = task?.status;
    tDTO.approvedHours = task?.approvedHours;
    tDTO.balanceHours = task?.balanceHours;
    tDTO.priority = task?.priority;
    tDTO.detailDescription = task?.detailDescription;
    tDTO.user = task?.user;
    console.log('Task DTO:', tDTO);
    return tDTO;
};

export const buildTaskListDTO = (task) => { 
    const tDTO = {...taskListDTO}   
    let id = 1;
    tDTO.id = id + 1;
    tDTO.ticketNumber = task?.ticketNumber;
    tDTO.customer = task?.customer;
    tDTO.contactName = task?.contactName;
    tDTO.projectName = task?.projectName;
    tDTO.subject = task?.subject;
    tDTO.attachment = task?.attachment;
    tDTO.status = task?.status;
    tDTO.approvedHours = task?.approvedHours;
    tDTO.balanceHours = task?.balanceHours;
    tDTO.priority = task?.priority;
    tDTO.detailDescription = task?.detailDescription;
    tDTO.user = task?.user;
    return tDTO;
};

export const buildTaskListsDTO = (tasks) => {     
    return tasks.map(task => buildTaskListDTO(task));
}   