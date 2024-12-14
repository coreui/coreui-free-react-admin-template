export const projectDTO = { 
    id: null,
    projectType: null,
    fromDate: null,
    status: null,
    toDate: null,
    customer: null,
    additionalHours: null,  
    projectName: null,  
    projectNameInEnglish: null, 
    projectMethod: null,
    budget: null,
    consumedHours: null,    
    balanceHours: null, 
};  

export const buildProjectDTO = (project) => {
    console.log(project);   

    let id = 1;      
    const pDTO = {...projectDTO}; 
    pDTO.id = id + 1;
    pDTO.projectType = project?.projectType;
    pDTO.fromDate = project?.fromDate;
    pDTO.status = project?.status;
    pDTO.toDate = project?.toDate;
    pDTO.customer = project?.customer;
    pDTO.additionalHours = project?.additionalHours;
    pDTO.projectName = project?.projectName;
    pDTO.projectNameInEnglish = project?.projectNameInEnglish;
    pDTO.projectMethod = project?.projectMethod;
    pDTO.budget = project?.budget;
    pDTO.consumedHours = project?.consumedHours;
    pDTO.balanceHours = project?.balanceHours;
    console.log(pDTO);  
    return pDTO;
}

export const buildProjectListDTO = (projects) => {      
    return projects.map(project => buildProjectDTO(project));
}   