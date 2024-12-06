import * as yup from 'yup';

const userValidationSchema = yup.object().shape({
    userType: yup.string().required('User Type is required'),
    name: yup.string().required('Name is required'),
    officeEmailId: yup.string().email('Invalid email format').required('Office email ID is required'),
    mobile: yup.string().required('Mobile is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    joiningDate: yup.date().required('Joining date is required'),
    consultantType: yup.string().required('Consultant type is required'),
    position: yup.string().required('Position is required'),
    dateOfBirth: yup.date().required('Date of birth is required'),
    status: yup.string().required('Status is required'),
    language: yup.string().required('Language is required'),
    locked: yup.string().required('Locked status is required'),
});

export default userValidationSchema;