import React, { useState } from 'react'
import { Box, Typography, TextField, Button, MenuItem, Divider, useTheme, Autocomplete, FormControlLabel, IconButton } from '@mui/material'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Formik, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormInput
} from '@coreui/react'
import Grid from '@mui/material/Grid2';
import AutoCompleteDataGrid from '../../components/common/AutoCompleteDataGrid';
import { createUser } from '../../slices/userSlice';
import { userDTO } from '../../dto/userDTO';
import { ConsultantTypes, ContactPersons, Form, Languages, LockStatus, Module, Positions, ProjectName, Status, TaskPriority, TaskStatus, Users, UserTypeArray, userTypeObj } from '../../components/common/utils';
import taskFormValidationSchema from './taskFormValidationSchema';
import { Add, Edit } from '@mui/icons-material';
import PopperComponent from '../../components/common/popper';
import ContactForm from './ContactForm';
import { auto } from '@popperjs/core';
import { createTask } from '../../slices/taskSlice';


const TaskForm = ({ user, show, handleClose, handleOpenDialog, onClose }) => {
  const dispatch = useDispatch();
  const [editedUser, setEditedUser] = useState(user)
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditContact, setIsEditContact] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    ticketNumber: null,
    customer: null,
    module: null,
    contactName: null,
    form: null,
    projectName: null,
    subject: null, // Only for customer
    attachment: null,
    status: null,
    approvedHours: null,
    balanceHours: null,
    priority: null,
    detailDescription: null,
    user: null,
  });

  const theme = useTheme();

  const formik = useFormik({
    initialValues: formData,
    validationSchema: taskFormValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(createTask(values)); 
      // handleOpenDialog()
      onClose();
    },
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Correctly sets the anchor element
    setOpen((prev) => !prev); // Toggles the Popper
    setIsEditContact(false);
  };

  const handleEditButtonClick = (event) => {
    setAnchorEl(event.currentTarget); // Correctly sets the anchor element
    setOpen((prev) => !prev); // Toggles the Popper
    setIsEditContact(true);
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
    { id: 5, customerName: 'Michael Lee', projectType: 'Cloud Computing' },
  ];

  const contactColumns = ["Customer Name"]; // Corrected typo
  const contactRows = [
    { id: 1, contactName: 'John Doe' },
    { id: 2, contactName: 'Jane Smith' },
    { id: 3, contactName: 'Sam Brown' },
    { id: 4, contactName: 'Alice Johnson' },
    { id: 5, contactName: 'Michael Lee' },
    
  ];



  return (
    <Box component="div">
      <Box component="div" sx={{ ...theme.formControl.formHeaderOuterContainer }}>
        <Box component="div" sx={{ ...theme.formControl.formHeaderContainer }} >
          <Typography variant="h6" gutterBottom>
            {isEditMode ? 'Edit Task' : 'Create New Task'}
          </Typography>
          <Box sx={{ ...theme.formControl.formHeaderButtonContainer }}>
            <Button
              onClick={onClose}
              variant="contained"
              style={{ marginRight: 8, backgroundColor: '#757575', color: 'white' }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" onClick={formik.handleSubmit} >
              {isEditMode ? 'Save Changes' : 'Create Task'}
            </Button>
          </Box>
        </Box>
        <Divider sx={{ background: 'black' }} />
      </Box>
      <Box sx={{ ...theme.formControl.formComponent }} component="form" onSubmit={formik.handleSubmit}>

        <Grid container spacing={2}>
          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              id="ticketNumber"
              name="ticketNumber"
              label="Ticket Number"
              value={formik.values.ticketNumber}
              onChange={formik.handleChange}
              error={formik.touched.ticketNumber && Boolean(formik.errors.ticketNumber)}
              helperText={formik.touched.ticketNumber && formik.errors.ticketNumber}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <AutoCompleteDataGrid
              label="Select Customer" 
              columns={autoCompleteDataGridColumns}
              rows={autoCompleteDataGridRows}
              value={formik.values.customer || ''}
              onChange={(event, value) => {
                formik.setFieldValue('customer', value);
              }}
              onBlur={() => formik.setFieldTouched('customer', true)}
              error={formik.touched.customer && Boolean(formik.errors.customer)}
              helperText={formik.touched.customer && formik.errors.customer}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              select
              id="module"
              name="module"
              label="Module"
              value={formik.values.module || ''}
              onChange={formik.handleChange}
              error={formik.touched.module && Boolean(formik.errors.module)}
              helperText={formik.touched.module && formik.errors.module}
            >
              {
                Module.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))
              }

            </TextField>
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <Grid container spacing={2}>
              <Grid item size={{ xs: 12, md: 8 }}>
                {/* <TextField
                  select
                  fullWidth
                  id="contactPerson"
                  name="contactPerson"
                  label="Contact Person"
                  value={formik.values.contactPerson || ''}
                  onChange={formik.handleChange}
                  error={formik.touched.contactPerson && Boolean(formik.errors.contactPerson)}
                  helperText={formik.touched.contactPerson && formik.errors.contactPerson}
                  disabled={!formik.values.customer}
                >
                  {
                    ContactPersons.map((option) => (
                      <MenuItem key={option.id} value={option}>
                        {option.label}
                      </MenuItem>
                    ))
                  }
                </TextField> */}
                
                <AutoCompleteDataGrid
                  label="Select Contact Person" 
                  columns={contactColumns}
                  rows={contactRows} 
                  value={formik.values.contactName || ''}
                  onChange={(event, value) => {
                    console.log("value",value);
                    formik.setFieldValue('contactName', value);
                  }}
                  onBlur={() => formik.setFieldTouched('contactName', true)}
                  error={formik.touched.contactName && Boolean(formik.errors.contactName)}
                  helperText={formik.touched.contactName && formik.errors.contactName}
                  disabled={!formik.values.customer}  
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 4 }} justifyContent="center" alignItems="center">
                {/* form and module */}
                <Box py={1}>
                  <IconButton
                    size='small'
                    variant="contained"
                    sx={{
                      background: 'red',
                      color: 'white',
                    }}
                    onClick={handleClick}
                    disabled={!formik.values.customer}
                    disableRipple
                  >
                    <Add />
                  </IconButton>
                  <IconButton
                    size='small'
                    variant="contained"
                    sx={{
                      background: 'blue',
                      color: 'white',
                      ml: 2
                    }}
                    onClick={handleEditButtonClick}
                    disabled={!formik.values.customer}
                    disableRipple>
                    <Edit />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              select
              id="form"
              name="form"
              label="Form"
              value={formik.values.form || ''}
              onChange={formik.handleChange}
              error={formik.touched.form && Boolean(formik.errors.form)}
              helperText={formik.touched.form && formik.errors.form}
              disabled={!formik.values.customer}
            >
              {
                Form.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))
              }
            </TextField>
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              select
              id="projectName"
              name="projectName"
              label="Project Name"
              value={formik.values.projectName || ''}
              onChange={formik.handleChange}
              error={formik.touched.projectName && Boolean(formik.errors.projectName)}
              helperText={formik.touched.projectName && formik.errors.projectName}
              disabled={!formik.values.customer}
            >
              {
                ProjectName.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))
              }
            </TextField>

          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              id="subject"
              name="subject"
              label="Subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
              error={formik.touched.subject && Boolean(formik.errors.subject)}
              helperText={formik.touched.subject && formik.errors.subject}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              type="file"
              id="attachment"
              name="attachment"
              label="Attachment" // Add a proper label here
              InputLabelProps={{
                shrink: true, // Ensures the label behaves correctly for file input
              }}
              onChange={(event) => {
                // Use formik's setFieldValue to set the file
                formik.setFieldValue("attachment", event.currentTarget.files[0]);
              }}
              // error={formik.touched.attachment && Boolean(formik.errors.attachment)}
              // helperText={formik.touched.attachment && formik.errors.attachment}
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              select
              id="status"
              name="status"
              label="Status"
              value={formik.values.status || ''}
              onChange={formik.handleChange}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
            >
              {
                TaskStatus.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))
              }
            </TextField>
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              id="approvedHours"
              name="approvedHours"
              label="Approved Hours"
              value={formik.values.approvedHours}
              onChange={formik.handleChange}
              error={formik.touched.approvedHours && Boolean(formik.errors.approvedHours)}
              helperText={formik.touched.approvedHours && formik.errors.approvedHours}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              id="balanceHours"
              name="balanceHours"
              label="Balance Hours"
              value={formik.values.balanceHours}
              onChange={formik.handleChange}
              error={formik.touched.balanceHours && Boolean(formik.errors.balanceHours)}
              helperText={formik.touched.balanceHours && formik.errors.balanceHours}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              id="priority"
              name="priority"
              label="Priority"
              select
              value={formik.values.priority || ''}
              onChange={formik.handleChange}
              error={formik.touched.priority && Boolean(formik.errors.priority)}
              helperText={formik.touched.priority && formik.errors.priority}
            >
              {
                TaskPriority.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))
              }
            </TextField>
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <Autocomplete
              value={formik.values.user || ''}
              onChange={(event, value) => {
                formik.setFieldValue('user', value);
              }}
              options={Users}
              getOptionLabel={(option) => option}
              onBlur={() => formik.setFieldTouched('user', true)}
              renderInput={(params) => <TextField {...params} label="User"
                 error={formik.touched.user && Boolean(formik.errors.user)}
               helperText={formik.touched.user && formik.errors.user}
                />}
              />
              
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}></Grid>
          <Grid item size={{ xs: 12, md: 12 }}>
            {/* <TextField
              fullWidth
              id="detailDescription"
              name="detailDescription"
              label="Detail Description"
              value={formik.values.detailDescription}
              onChange={formik.handleChange}
              error={formik.touched.detailDescription && Boolean(formik.errors.detailDescription)}
              helperText={formik.touched.detailDescription && formik.errors.detailDescription}
            /> */}
            <Box component="div" sx={{ height: "auto" }} paddingY={2} mb={2}>
              <Typography variant="h6" gutterBottom>Detail Description</Typography>
              <ReactQuill theme='snow'
                value={formik.values.detailDescription}
                onChange={(value) => formik.setFieldValue('detailDescription', value)}
                style={{ height: '90px', marginBottom: 16 }}
              />
            </Box>
          </Grid>

        </Grid>
        <PopperComponent open={open} anchorEl={anchorEl}>
          <ContactForm isEditContact={isEditContact} onClose={handleClosePopper} />
        </PopperComponent>

      </Box>
      <Box component="div" padding={4}></Box>
    </Box>
  )

}

export default TaskForm;
