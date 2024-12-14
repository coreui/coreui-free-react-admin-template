import * as yup from 'yup';

const projectFormValidationSchema = yup.object().shape({
    projectType: yup.string().required('Project Type is required'),
    fromDate: yup.date().required('From Date is required'),
    status: yup.string().required('Status is required'),
    toDate: yup.date().required('To Date is required'),
    customer: yup.object().required('Customer is required'),
    additionalHours: yup.object().required('Additional Hours is required'),
    projectName: yup.string().required('Project Name is required'),
    projectMethod: yup.string().required('Project Method is required'),
    projectNameInEnglish: yup.string().required('Project Name in English is required'),
    budget: yup.number().required('Budget is required').min(0, 'Budget must be a positive number'),
    consumedHours: yup.number().required('Consumed Hours is required').min(0, 'Consumed Hours must be a positive number'),
    balanceHours: yup.number().required('Balance Hours is required').min(0, 'Balance Hours must be a positive number'),
});

export default projectFormValidationSchema;