import React, { useState } from 'react'
import { Box, Typography, TextField, Button, MenuItem, Divider, useTheme } from '@mui/material'
import { Formik, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid2';
import contactFormValidationSchema from './contactFormValidationSchema';
import { addNewContact } from '../../../slices/contactSlice';
import { showAlert } from '../../../slices/alertSlice';

const ContactForm = ({ contact, show, handleClose, handleOpenDialog, onClose }) => {
  const dispatch = useDispatch(); 
  const { contactList } = useSelector((state) => state.contacts); 
  const theme = useTheme();
  const [formData, setFormData] = useState({
    contactName: '',
    email: '',
    phone: '',
    extension: '',
    cellular: '',
    position: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const formik = useFormik({
    initialValues: formData,
    validationSchema: contactFormValidationSchema,
    onSubmit: (values) => {
      console.log(values); 
      dispatch(addNewContact(values));
      const alert ={
        open: true,
        message: "Contact created successfully",
        severity: "success",
      };
      dispatch(showAlert(alert));
      onClose();   
    },
  });

  return (
    <Box component="div">
       <Box component="div" sx={{...theme.formControl.formHeaderOuterContainer}}>
      <Box component="div" sx={{...theme.formControl.formHeaderContainer}}>
        <Typography variant="h6" gutterBottom>
          {isEditMode ? 'Edit Contact' : 'Create New Contact'}
        </Typography>
        <Box component="div" sx={{...theme.formControl.formHeaderButtonContainer}}>
          <Button
            onClick={onClose}
            variant="contained"
            style={{ marginRight: 8, backgroundColor: '#757575', color: 'white' }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" onClick={formik.handleSubmit} >
            {isEditMode ? 'Save Changes' : 'Create Contact'}
          </Button>
        </Box>
      </Box>
      <Divider sx={{background: 'black'}}/>
      </Box>
      <Box component="form" sx={{...theme.formControl.formComponent}} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Contact Name"
              name="contactName"
              value={formik.values.contactName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.contactName && Boolean(formik.errors.contactName)}
              helperText={formik.touched.contactName && formik.errors.contactName}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Extension"
              name="extension"
              value={formik.values.extension}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.extension && Boolean(formik.errors.extension)}
              helperText={formik.touched.extension && formik.errors.extension}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Cellular"
              name="cellular"
              value={formik.values.cellular}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cellular && Boolean(formik.errors.cellular)}
              helperText={formik.touched.cellular && formik.errors.cellular}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Position"
              name="position"
              value={formik.values.position}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.position && Boolean(formik.errors.position)}
              helperText={formik.touched.position && formik.errors.position}
            />
          </Grid>
        </Grid>
      </Box>
      <Box component="div" padding={4}></Box>
    </Box>
  )
}

export default ContactForm;
