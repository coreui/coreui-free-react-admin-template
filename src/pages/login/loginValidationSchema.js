import * as Yup from 'yup';

const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    otp: Yup.string()
        .length(6, 'OTP must be exactly 6 digits')
        .when('isOTP', {
            is: true,
            then: (schema) => schema.required('OTP is required')  
        }),  
});

export default loginValidationSchema;