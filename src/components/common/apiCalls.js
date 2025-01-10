import axios from 'axios';  


export let baseUrl = '';

await fetch('connection.json')
    .then(response => response.json())
    .then(data => {
        baseUrl = data.apiUrl;  // Update the exported baseUrl directly
        console.log(baseUrl);   // Verify the value
    })
    .catch(err => console.log(err));



// export const getCustomerLists = async () => {
//     return await axios({
//         method: "GET",
//         url: `${baseUrl}/Customer/List`,
//     })

// }
export const ApiQueryParams={
filter: null,
orderby: null,  
pagesize: null, 
page: null,
select: null
}
const apiName={
    GetUsers: "GetUsers",
    InsertUser: "InsertUser",
    UpdateUser: "UpdateUser",
    DeleteUser: "DeleteUser",
    GetCustomers: "GetCustomers",
    InsertCustomer: "InsertCustomer",
    UpdateCustomer: "UpdateCustomer",
    DeleteCustomer: "DeleteCustomer",
}
const ConstructApiCall = (ApiName, data = null,QueryParams=ApiQueryParams) => {
    
    // Construct query parameters
    let queryParams = new URLSearchParams();

    if (QueryParams.filter) queryParams.append("filter", QueryParams?.filter);
    if (QueryParams.orderby) queryParams.append("orderby", QueryParams?.orderby);
    if (QueryParams.pagesize) queryParams.append("pagesize", QueryParams?.pagesize);
    if (QueryParams.page) queryParams.append("page", QueryParams?.page);
    if (QueryParams.select) queryParams.append("select", QueryParams?.select);

    const tempUrl = data ? `${baseUrl}/postdata/${ApiName}` : `${baseUrl}/getdata/${ApiName}`;   

    const finalUrl = queryParams.toString() ? `${tempUrl}?${queryParams.toString()}` : `${tempUrl}`;
    console.log("finalUrl", finalUrl);
    return {
        url: finalUrl,
        method: data ? "POST" : "GET",
        body: data ? data : null,
        headers: {
            "Content-Type": "application/json"
        }
    };
};

const getDataFromResponse = (response) => {
    if (response.data) {
        const resultString = response.data[0].resObject[0].result;
        console.log("Result String:", resultString);        

        const result = JSON.parse(resultString);
        console.log("Result:", result); 
        return result.data;  
    }
    return null;
};


//user login
export const userLogin = async (credentials) => {
    return credentials;
}   

//Get user list
export const getUserList = async (QueryParams) => {
    const apiCallConfig = ConstructApiCall(apiName.GetUsers,null,QueryParams);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        console.log("Response:", response);

        const extractedData = getDataFromResponse(response);
        return extractedData;
        console.log("Extracted Data:", extractedData);      
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
};

//get single user
export const getSingleUser = async (obj) => {
    const apiCallConfig = ConstructApiCall(apiName.GetUsers,obj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }   
}
//Create user
export const createNewUser = async (userObj) => {
    const apiCallConfig = ConstructApiCall(apiName.InsertUser,userObj);
    console.log("API Call Config:", apiCallConfig)


    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}

//Update user
export const updateUser = async (userObj) => {
    const apiCallConfig = ConstructApiCall(apiName.UpdateUser,userObj);
    console.log("API Call Config:", apiCallConfig)


    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}

export const deleteUser = async (obj) => {
    const apiCallConfig = ConstructApiCall(apiName.DeleteUser,obj);
    console.log("API Call Config:", apiCallConfig)


    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return response;
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}


//Get customer list 
export const customerList = async (QueryParams) => {
    const apiCallConfig = ConstructApiCall(apiName.GetCustomers,null,QueryParams);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}; 

//Create customer
export const createNewCustomer = async (customerObj) => {
    const apiCallConfig = ConstructApiCall(apiName.InsertCustomer,customerObj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}; 

//Update customer
export const updateCustomer = async (customerObj) => {
    const apiCallConfig = ConstructApiCall(apiName.UpdateCustomer,customerObj);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return getDataFromResponse(response);
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
};

//Delete customer
export const deleteCustomer = async (customerId) => {
    const apiCallConfig = ConstructApiCall(apiName.DeleteCustomer,customerId);
    console.log("API Call Config:", apiCallConfig)

    try {
        const response = await axios({
            method: apiCallConfig.method,
            url: apiCallConfig.url,
            data: apiCallConfig.body,
            headers: apiCallConfig.headers
        });

        return response;
    } catch (error) {
        console.error("API call failed", error);
        return null;
    }
}


// export const createNewCustomer = async (customerObj) => {
//     return customerObj;
// }

export const getCustomerList = async (customerList) => {
    return customerList;
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

