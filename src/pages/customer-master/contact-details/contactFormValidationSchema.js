import * as yup from 'yup';
const contactFormValidationSchema = yup.object().shape({
    contactName: yup.string()
        .required('Contact name is required')
        .min(2, 'Contact name must be at least 2 characters')
        .max(50, 'Contact name must be less than 50 characters'),
    email: yup.string()
        .required('Email is required')
        .email('Email is not valid'),
    phone: yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]+$/, 'Phone number must be only digits')
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number must be less than 15 digits'),
    extension: yup.string()
        .matches(/^[0-9]*$/, 'Extension must be only digits')
        .max(5, 'Extension must be less than 5 digits'),
    cellular: yup.string()
        .matches(/^[0-9]+$/, 'Cellular number must be only digits')
        .min(10, 'Cellular number must be at least 10 digits')
        .max(15, 'Cellular number must be less than 15 digits'),
    position: yup.string()
        .required('Position is required')
        .min(2, 'Position must be at least 2 characters')
        .max(50, 'Position must be less than 50 characters'),
});

export default contactFormValidationSchema;