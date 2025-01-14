import * as Yup from 'yup';

const validationSchema = Yup.object({
  id: Yup.string().nullable(),
  customerId: Yup.string().nullable(),
  contactName: Yup.string()
    .required('Contact name is required')
    .min(2, 'Contact name must be at least 2 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  extension: Yup.string().required('Extension is required'),
  cellular: Yup.string().required('Cellular is required'),
  position: Yup.string().required('Position is required'),
  accessPortal: Yup.boolean(),
  sendEmail: Yup.boolean(), 
  locked: Yup.string()
    .required('Lock status is required')
    .oneOf(['locked', 'unlocked'], 'Invalid lock status'),
  status: Yup.boolean().nullable(),
  isPrimary: Yup.boolean().nullable(),
  createdAt: Yup.date().nullable(),
  createdBy: Yup.string().nullable(),
});

export default validationSchema;
