import React, { useState } from 'react'
import { Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel, FormControlLabel, Checkbox, Divider } from '@mui/material'
import { Formik, useFormik } from 'formik';
import Grid from '@mui/material/Grid2';
import Autocomplete from '@mui/material/Autocomplete';
import contactFormValidationSchema from '../customer-master/contact-details/contactFormValidationSchema';
import AutoCompleteDataGrid from '../../components/common/AutoCompleteDataGrid';
import projectFormValidationSchema from './projectFormValidationSchema';

const ProjectForm = ({ contact, show, handleClose, handleOpenDialog, onClose }) => {

  const [formData, setFormData] = useState({
    projectType: '',
    fromDate: '',
    status: '',
    toDate: '',
    customer: '',
    additionalHours: '',
    projectName: '',
    projectMethod: '',
    projectNameInEnglish: '',
    budget: '',
    consumedHours: '',
    balanceHours: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const formik = useFormik({
    initialValues: formData,
    validationSchema: projectFormValidationSchema,
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
          {isEditMode ? 'Edit Project' : 'Create New Project'}
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
            {isEditMode ? 'Save Changes' : 'Create Project'}
          </Button>
        </Box>
      </Box>
      <Divider sx={{background: 'black'}}/>
      </Box>
      <Box padding={2} mt={1} component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Project Type</InputLabel>
              <Select
                label="Project Type"
                name="projectType"
                value={formik.values.projectType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.projectType && Boolean(formik.errors.projectType)}
              >
                <MenuItem value="implementation">Implementation</MenuItem>
                <MenuItem value="support">Support</MenuItem>
                <MenuItem value="development">Development</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="From Date"
              name="fromDate"
              type="date"
              value={formik.values.fromDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fromDate && Boolean(formik.errors.fromDate)}
              helperText={formik.touched.fromDate && formik.errors.fromDate}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.status && Boolean(formik.errors.status)}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="To Date"
              name="toDate"
              type="date"
              value={formik.values.toDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.toDate && Boolean(formik.errors.toDate)}
              helperText={formik.touched.toDate && formik.errors.toDate}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <AutoCompleteDataGrid
              fullWidth
              label="Customer"
              name="customer"
              value={formik.values.customer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.customer && Boolean(formik.errors.customer)}
              helperText={formik.touched.customer && formik.errors.customer}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Additional Hours"
              name="additionalHours"
              type='number'
              value={formik.values.additionalHours}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.additionalHours && Boolean(formik.errors.additionalHours)}
              helperText={formik.touched.additionalHours && formik.errors.additionalHours}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Project Name"
              name="projectName"
              value={formik.values.projectName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.projectName && Boolean(formik.errors.projectName)}
              helperText={formik.touched.projectName && formik.errors.projectName}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Project Method</InputLabel>
              <Select
                label="Project Method"
                name="projectMethod"
                value={formik.values.projectMethod}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.projectMethod && Boolean(formik.errors.projectMethod)}
              >
                <MenuItem value="Project">Project</MenuItem>
                <MenuItem value="Bank Hour">Bank Hour</MenuItem>
                <MenuItem value="Actual hours">Actual hours</MenuItem>
                <MenuItem value="Monthly retainer">Monthly retainer</MenuItem>
                <MenuItem value="Yearly retainer">Yearly retainer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Project Name in English"
              name="projectNameInEnglish"
              value={formik.values.projectNameInEnglish}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.projectNameInEnglish && Boolean(formik.errors.projectNameInEnglish)}
              helperText={formik.touched.projectNameInEnglish && formik.errors.projectNameInEnglish}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Budget"
              name="budget"
              value={formik.values.budget}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.budget && Boolean(formik.errors.budget)}
              helperText={formik.touched.budget && formik.errors.budget}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Consumed Hours"
              name="consumedHours"
              value={formik.values.consumedHours}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.consumedHours && Boolean(formik.errors.consumedHours)}
              helperText={formik.touched.consumedHours && formik.errors.consumedHours}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Balance Hours"
              name="balanceHours"
              value={formik.values.balanceHours}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.balanceHours && Boolean(formik.errors.balanceHours)}
              helperText={formik.touched.balanceHours && formik.errors.balanceHours}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  name="alwaysChecked"
                  color="primary"
                />
              }
              label="Is Approved Hours"
            />
          </Grid>
        </Grid>
      </Box>
      <Box component="div" padding={4}></Box>
    </Box>
  )
}

export default ProjectForm;
