import * as yup from 'yup';

const taskFormValidationSchema = yup.object().shape({
    ticketNumber: yup.string().required('Ticket number is required'),    
    customer: yup.object().required('Customer is required'),    
    // module: yup.string().required('Module is required'),    
    contactName: yup.object().required('Contact person is required'),
    // form: yup.string().required('Form is required'),
    projectName: yup.string().required('Project name is required'),
    subject: yup.string().required('Subject is required'),   
    // attachment: yup.mixed().nullable().required('Attachment is required'),
    status: yup.string().required('Status is required'),
    approvedHours: yup.number().required('Approved hours is required'),
    balanceHours: yup.number().required('Balance hours is required'),
    priority: yup.string().required('Priority is required'),
    // detailDescription: yup.string().required('Detail description is required'),  
    user: yup.string().required('User is required'), 
});

export default taskFormValidationSchema;