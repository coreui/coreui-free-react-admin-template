import * as yup from 'yup';

const userValidationSchema = yup.object().shape({
    userType: yup.string().required('User Type is required'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    userName: yup.string().required('User name is required'),
    officeEmailId: yup.string().email('Invalid email format').required('Office email ID is required'),
    mobile: yup.string().required('Mobile is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    customer: yup.object().when('userType', {
        is: (val) => val === 'Customer',  // If the user type is customer, then the customer name is required
        then: (schema) => schema.required('Customer name is required'), //
        otherwise: (schema) => schema.nullable() // If the user type is not customer, then the customer name is not required   
    }),
    joiningDate: yup.date().when('userType', {
        is: (val) => val !== 'Customer', // If the user type is not customer, then the joining date is required
        then: (schema) => schema.required('Joining date is required'), //  
        otherwise: (schema) => schema.nullable(), // If the user type is customer, then the joining date is not required 
    }),
    consultantType: yup.string().when('userType', {
        is: (val) => val !== 'Customer', // If the user type is not customer, then the consultant type is required
        then: (schema) => schema.required('Consultant type is required'), //
        otherwise: (schema) => schema.nullable(), // If the user type is customer, then the consultant type is not required
    }),
    position: yup.string().when('userType', {
        is: (val) => val !== 'Customer', // If the user type is not customer, then the position is required
        then: (schema) => schema.required('Position is required'), //   
        otherwise: (schema) => schema.nullable(), // If the user type is customer, then the position is not required    
    }),
    dateOfBirth: yup.date().when('userType', {
        is: (val) => val !== 'Customer', // If the user type is not customer, then the date of birth is required
        then: (schema) => schema.required('Date of birth is required'), // 
        otherwise: (schema) => schema.nullable(), // If the user type is customer, then the date of birth is not required 
    }),
    status: yup.string().required('Status is required'),
    language: yup.string().when('userType', {
        is: (val) => val !== 'Customer', // If the user type is not customer, then the language is required
        then: (schema) => schema.required('Language is required'), //
        otherwise: (schema) => schema.nullable(), // If the user type is customer, then the language is not required   
    }),
    locked: yup.string().required('Locked status is required'),
});

export default userValidationSchema;