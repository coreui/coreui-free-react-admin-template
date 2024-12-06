import React, { useState } from 'react'
import { Box, Typography, TextField, Button, MenuItem, Divider } from '@mui/material'
import { Formik, useFormik } from 'formik';
import Grid from '@mui/material/Grid2';
import contactFormValidationSchema from './contactFormValidationSchema';

const ContactForm = ({ contact, show, handleClose, handleOpenDialog, onClose }) => {

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
    },
  });

  return (
    <Box component="div">
       <Box component="div" position="sticky" top={0}
        zIndex={10}
        bgcolor="background.paper"
        py={1}
      >
      <Box component="div" py={1} px={2} display="flex" justifyContent="space-between" alignItems="center" position="sticky" top={0}
        zIndex={10}
        bgcolor="background.paper" >
        <Typography variant="h6" gutterBottom>
          {isEditMode ? 'Edit Contact' : 'Create New Contact'}
        </Typography>
        <Box display="flex" justifyContent="flex-end">
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
      <Box padding={2} mt={1} component="form" onSubmit={formik.handleSubmit}>
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
