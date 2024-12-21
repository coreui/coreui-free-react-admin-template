import axios from 'axios';  

export let baseUrl = '';
// await fetch('connection.json')
//     .then(response => response.json())
//     .then(data => {
//         const baseUrl = data.apiUrl 
//         console.log(baseUrl);
//     }
//     )
//     .catch(err => console.log(err));


// export const getCustomerLists = async () => {
//     return await axios({
//         method: "GET",
//         url: `${baseUrl}/Customer/List`,
//     })

// }

//user login
export const userLogin = async (credentials) => {
    return credentials;
}   

//Get user list
export const getUserList = async (taskList) => {
    return taskList;
}

//Create user
export const createNewUser = async (userObj) => {
    return userObj;
}

//Get customer list 
export const getCustomerList = async (customerList) => {
    return customerList;
}   

//Create customer   
export const createNewCustomer = async (customerObj, connections) => {
    return {customerObj, connections};  
}

//Get connection list
export const getConnectionList = async (connectionList) => {
    return connectionList;
}

//Create connection 
export const createNewConnection = async (connectionObj) => {    
    return connectionObj;
}  

//Get contact list
export const getContactList = async (contactList) => {
    return contactList;
}       

//Create contact
export const createNewContact = async (contactObj) => {
    return contactObj;
}   

//Get project list
export const getProjectList = async (projectList) => {
    return projectList;
}   

//Create project
export const createNewProject = async (projectObj) => {
    return projectObj;
}   

//Get task list 
export const getTaskList = async (taskList) => {
    return taskList;
}   

//Create task   
export const createNewTask = async (taskObj) => {
    return taskObj;
}   

//Get time sheet list   
export const getTimeSheetList = async (timeSheetList) => {
    return timeSheetList;
}

//Create time sheet 
export const createNewTimeSheet = async (timeSheetObj) => {
    return timeSheetObj;
}

//Get hours list    
export const getHoursList = async (hoursList) => {
    return hoursList;
}   

//Create hours  
export const createNewHours = async (hoursObj) => {
    return hoursObj;
}   

