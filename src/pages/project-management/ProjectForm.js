import React, { useState } from 'react'
import { Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel, FormControlLabel, Checkbox, Divider, useTheme, IconButton } from '@mui/material'
import { Formik, useFormik } from 'formik';
import Grid from '@mui/material/Grid2';
import Autocomplete from '@mui/material/Autocomplete';
import contactFormValidationSchema from '../customer-master/contact-details/contactFormValidationSchema';
import AutoCompleteDataGrid from '../../components/common/AutoCompleteDataGrid';
import projectFormValidationSchema from './projectFormValidationSchema';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProject } from '../../slices/projectSlice';
import { ProjectMethod, ProjectTypes, Status } from '../../components/common/utils';
import { Search } from '@mui/icons-material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PopperComponent from '../../components/common/popper';
import ContactForm from '../task-management/ContactForm';
import HourForm from './HourForm';
import { showAlert } from '../../slices/alertSlice';

const ProjectForm = ({ contact, show, handleClose, handleOpenDialog, onClose }) => {

  const dispatch = useDispatch();
  const { hours } = useSelector((state) => state.hours);

  const theme = useTheme();

  const [formData, setFormData] = useState({
    projectType: '',
    fromDate: '',
    status: '',
    toDate: '',
    customer: null,
    additionalHours: '',
    projectName: '',
    projectMethod: '',
    projectNameInEnglish: '',
    budget: '',
    consumedHours: '',
    balanceHours: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEditContact, setIsEditContact] = useState(false);


  const formik = useFormik({
    initialValues: formData,
    validationSchema: projectFormValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(addNewProject(values));
      const alert ={
        open: true,
        message: "Project added successfully",
        severity: "success",
      };
      dispatch(showAlert(alert));
      onClose();
    },
  });


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Correctly sets the anchor element
    setOpen((prev) => !prev); // Toggles the Popper
    setIsEditContact(false);
  };

  const handleClosePopper = () => {
    setOpen(false);
  };

  const autoCompleteDataGridColumns = ["Customer Name", "Project Type"];
  const autoCompleteDataGridRows = [
    { id: 1, customerName: 'John Doe', projectType: 'Web Development' },
    { id: 2, customerName: 'Jane Smith', projectType: 'Mobile App' },
    { id: 3, customerName: 'Sam Brown', projectType: 'Data Analysis' },
    { id: 4, customerName: 'Alice Johnson', projectType: 'SEO Optimization' },
    { id: 6, customerName: 'Michael Lee', projectType: 'Cloud Computing' },
    { id: 7, customerName: 'Michael Lee', projectType: 'Cloud Computing' },
    { id: 8, customerName: 'Michael Lee', projectType: 'Cloud Computing' },

    { id: 9, customerName: 'Michael Lee', projectType: 'Cloud Computing' },

  ];

  return (
    <Box component="div">
      <Box component="div" sx={{ ...theme.formControl.formHeaderOuterContainer }}>
        <Box component="div" sx={{ ...theme.formControl.formHeaderContainer }}>
          <Typography variant="h6" gutterBottom>
            {isEditMode ? 'Edit Project' : 'Create New Project'}
          </Typography>
          <Box component="div" sx={{ ...theme.formControl.formHeaderButtonContainer }}>
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
        <Divider sx={{ background: 'black' }} />
      </Box>
      <Box component="form" sx={{ ...theme.formControl.formComponent }} onSubmit={formik.handleSubmit}>
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
                {
                  ProjectTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))
                }

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
                {
                  Status.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))
                }

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
              label="Select Customer" 
              columns={autoCompleteDataGridColumns}
              rows={autoCompleteDataGridRows}
              value={formik.values.customer || ''}
              onChange={(event, value) => {
                console.log("Value:", value);
                formik.setFieldValue('customer', value);
              }}
              onBlur={() => formik.setFieldTouched('customer', true)}
              error={formik.touched.customer && Boolean(formik.errors.customer)}
              helperText={formik.touched.customer && formik.errors.customer}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container spacing={1} justifyContent="center" alignItems="center">
              <Grid item size={{ xs: 12, md: 10 }}>
                <TextField
                  fullWidth
                  label="Additional Hours"
                  name="additionalHours"
                  type='number'
                  value={formik.values.additionalHours || hours.hours}  
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.additionalHours && Boolean(formik.errors.additionalHours)}
                  helperText={formik.touched.additionalHours && formik.errors.additionalHours}
                  InputLabelProps={{ shrink: true }}  
                  disabled
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 2 }}>
                <IconButton
                  size='small'
                  variant='contained'
                  color='primary' 
                  onClick={handleClick}
                  disableRipple
                >
                  <FormatListBulletedIcon />
                </IconButton>
              </Grid>
            </Grid>

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
                {
                  ProjectMethod.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))
                }
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
        <PopperComponent open={open} anchorEl={anchorEl}>
          <HourForm isEditContact={isEditContact} onClose={handleClosePopper} />
        </PopperComponent>
      </Box>
      <Box component="div" padding={4}></Box>
    </Box>
  )
}

export default ProjectForm;
