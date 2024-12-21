import Cookies from 'universal-cookie';
import LowPriorityIcon from '@mui/icons-material/LowPriority'; // Example icon
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import MediumPriorityIcon from '@mui/icons-material/Flag'; // Custom medium icon


//enums
export const userTypeObj = {
    NONE: 'None',
    ADMIN: 'Admin',
    CONSULTANT: 'Consultant',
    CUSTOMER: 'Customer'

}

export const UserTypeArray = ["None", "Admin", "Consultant", "Customer"];
export const ConsultantTypes = ["Technical", "Functional", "Implementation", "Support", "Development"];
export const Positions = ["Manager", "Senior", "Junior"];
export const Status = ["Active", "Inactive"];
export const Languages = ["English", "Hebrew"];
export const LockStatus = ["Locked", "Unlocked"];

export const ProjectTypes = ["Implementation", "Support", "Development", "License", "All"];
export const ContactPersons = [
    { label: 'John Doe', id: 1 },
    { label: 'Jane Smith', id: 2 },
    { label: 'Alice Johnson', id: 3 },
    { label: 'Bob Brown', id: 4 },
];

export const ConnectionTypes = ["VPN", "Remote Desktop", "SAP", "SQL"];
export const VPNTypes = ["CheckPoint", "FortiClient", "Sohpos", "ZeroTier"];

export const ProjectMethod = ["Project", "Bank Hour", "Actual Hour", "Monthly Retainer", "Yearly Retainer"];

export const Module = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5"]; 
export const Form = ["Form 1", "Form 2", "Form 3", "Form 4", "Form 5"]; 
export const ProjectName = ["Project 1", "Project 2", "Project 3", "Project 4", "Project 5"]; 
export const TaskStatus = ["Open", "Assigned", "In Progress", "Deployed", "Confirmed"];
export const TaskPriority = ["Low", "Medium", "High"]; 
export const Users = ["User 1", "User 2", "User 3", "User 4", "User 5"];


//Api status
export const Api_Status = {
    Idle: 'idle',
    Loading: 'loading',
    Succeeded: 'succeeded',
    Failed: 'failed'
}

//get login user
export const getLoginUser=()=>{
    const cookies = new Cookies(null, { path: '/' });
    return cookies.get('user');

}

//remove cookie 
export const removeCookie=()=>{
    const cookies = new Cookies(null, { path: '/' });
     cookies.remove("user", { path: '/' })

}


//icons helper function
export const getPriorityIcon = (priority) => {
    switch (priority.toLowerCase()) {
      case 'low':
        return <LowPriorityIcon style={{ marginRight: 10, color: 'green' }} />;
      case 'medium':
        return <MediumPriorityIcon style={{ marginRight: 10, color: 'orange' }} />;
      case 'high':
        return <PriorityHighIcon style={{ marginRight: 10, color: 'red' }} />;
      default:
        return null;
    }
  };
  



