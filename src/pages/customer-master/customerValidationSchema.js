import * as Yup from 'yup';

const customerValidationSchema = Yup.object().shape({
    customerName: Yup.string().required('Customer name is required'),
    contactPerson: Yup.array().required('Contact person is required'),
    customerNameInEnglish: Yup.string().required('Customer name in English is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    country: Yup.string().required('Country is required'),
    projectType: Yup.string().required('Project type is required'),
    siteLocation: Yup.string().required('Site location is required'),
    distanceInKm: Yup.number().required('Distance in km is required').positive('Distance must be a positive number'),
    SAPVersion: Yup.string().required('SAP version is required'),
    SAPCode: Yup.string().required('SAP code is required'),
    controlCenterUser: Yup.string().required('Control center user is required'),
    controlCenterPass: Yup.string().required('Control center password is required'),
});

export default customerValidationSchema;