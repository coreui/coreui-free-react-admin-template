import React, { useState } from 'react'
import { Box, Typography, TextField, Button, Popper, Divider, Paper, Grow, IconButton, Tooltip } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Formik, useFormik } from 'formik';
// import {
//   CButton,
//   CModal,
//   CModalHeader,
//   CModalTitle,
//   CModalBody,
//   CModalFooter,
//   CForm,
//   CFormLabel,
//   CFormInput
// } from '@coreui/react'
import userValidationSchema from '../user-management/userValidationSchema';
import Grid from '@mui/material/Grid2';
import customerValidationSchema from './customerValidationSchema';
import ConnectionSettingGrid from '../../components/common/ConnectionSettingGrid';
import ConnectionForm from './ConnectionsForm';
import { Delete, Edit } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';


const userTypes = ["None", "Admin", "Consultant", "Customer"];
const consultantTypes = ["Technical", "Functional", "Implementation", "Support", "Development"];
const positions = ["Manager", "Senior", "Junior"];
const statuses = ["Active", "Inactive"];
const languages = ["English", "Hebrew"];
const lockStatuses = ["Locked", "Unlocked"];

const CustomerForm = ({ user, show, handleClose, onClose }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(user)
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    contactPerson: '',
    customerNameInEnglish: '',
    email: '',
    phoneNumber: '',
    country: '',
    projectType: '',
    siteLocation: '',
    distanceInKm: '',
    SAPVersion: '',
    SAPCode: '',
    controlCenterUser: '',
    controlCenterPass: '',
    installationCredentials: '',
  });
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));


  const formik = useFormik({
    initialValues: formData,
    validationSchema: customerValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleOpenDialog()
    },
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Correctly sets the anchor element
    setOpen((prev) => !prev); // Toggles the Popper
  };

  const handleCancelPopper = () => {
    setOpen(false);
  };


  const columns = [
    { field: 'connectionType', headerName: 'Connection Type', flex: 1 },
    { field: 'vpnType', headerName: 'VPN Type', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'user', headerName: 'User', flex: 1 },
    { field: 'password', headerName: 'Password', flex: 1 },
    {
      field: 'actions',
      headerName: '',
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Tooltip title={"Delete"}>
            <IconButton
              size="small"
              variant="contained"
              color="primary"
              title="Delete"
            // onClick={() => handleEditClick(params.row)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  const rows = [
    { id: 1, connectionType: 'VPN', vpnType: 'SSL', address: '192.168.1.1', user: 'admin', password: 'password123' },
    { id: 2, connectionType: 'RMT', vpnType: 'None', address: '10.0.0.1', user: 'user', password: 'password456' },
    { id: 3, connectionType: 'SAP', vpnType: 'None', address: 'None', user: 'user', password: 'password456' },
    { id: 4, connectionType: 'SQL', vpnType: 'None', address: 'None', user: 'user', password: 'password456' },

  ];

  const contactPersons = [
    { label: 'John Doe', id: 1 },
    { label: 'Jane Smith', id: 2 },
    { label: 'Alice Johnson', id: 3 },
    { label: 'Bob Brown', id: 4 },
  ];


  return (
    <Box component="div">
      <Box component="div" position="sticky" top={0}
        zIndex={10}
        bgcolor="background.paper"
        py={3}
      >
      <Box component="div" py={1} px={2} display="flex" justifyContent="space-between" alignItems="center" position="sticky" top={0}
        zIndex={10}
        bgcolor="background.paper" >
        <Typography variant="h6" gutterBottom>
          {isEditMode ? 'Edit Customer' : 'Create New Customer'}
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={onClose}
            variant="contained"
            color="secondary"
            style={{ marginRight: 8, backgroundColor: '#757575', color: 'white' }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" onClick={formik.handleSubmit} > //common style sheet
            {isEditMode ? 'Save Changes' : 'Create Customer'}
          </Button>
        </Box>
      </Box>
      <Divider sx={{background: 'black'}}/>
      </Box>


      <Box paddingX={2} mt={0} component="form" >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }} >
            <TextField
              fullWidth
              label="Customer Name"
              name="customerName"
              value={formik.values.customerName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.customerName && Boolean(formik.errors.customerName)}
              helperText={formik.touched.customerName && formik.errors.customerName}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
        
            <Autocomplete
              fullWidth
              multiple
              options={contactPersons}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Contact Person"
                  name="contactPerson"
                  value={formik.values.contactPerson}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.contactPerson && Boolean(formik.errors.contactPerson)}
                  helperText={formik.touched.contactPerson && formik.errors.contactPerson}
                  required
                />
              )}
              onChange={(event, value) => formik.setFieldValue('contactPerson', value ? value.label : '')}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Customer Name In English"
              name="customerNameInEnglish"
              value={formik.values.customerNameInEnglish}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.customerNameInEnglish && Boolean(formik.errors.customerNameInEnglish)}
              helperText={formik.touched.customerNameInEnglish && formik.errors.customerNameInEnglish}
              required
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
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Project Type"
              name="projectType"
              value={formik.values.projectType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.projectType && Boolean(formik.errors.projectType)}
              helperText={formik.touched.projectType && formik.errors.projectType}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Site Location"
              name="siteLocation"
              value={formik.values.siteLocation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.siteLocation && Boolean(formik.errors.siteLocation)}
              helperText={formik.touched.siteLocation && formik.errors.siteLocation}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Distance In Km"
              name="distanceInKm"
              value={formik.values.distanceInKm}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.distanceInKm && Boolean(formik.errors.distanceInKm)}
              helperText={formik.touched.distanceInKm && formik.errors.distanceInKm}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="SAP Version"
              name="SAPVersion"
              value={formik.values.SAPVersion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.SAPVersion && Boolean(formik.errors.SAPVersion)}
              helperText={formik.touched.SAPVersion && formik.errors.SAPVersion}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="SAP Code"
              name="SAPCode"
              value={formik.values.SAPCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.SAPCode && Boolean(formik.errors.SAPCode)}
              helperText={formik.touched.SAPCode && formik.errors.SAPCode}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Control Center User"
              name="controlCenterUser"
              value={formik.values.controlCenterUser}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.controlCenterUser && Boolean(formik.errors.controlCenterUser)}
              helperText={formik.touched.controlCenterUser && formik.errors.controlCenterUser}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Control Center Pass"
              name="controlCenterPass"
              type="password"
              value={formik.values.controlCenterPass}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.controlCenterPass && Boolean(formik.errors.controlCenterPass)}
              helperText={formik.touched.controlCenterPass && formik.errors.controlCenterPass}
              required
            />
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ bgcolor: "black" }} />
      <Box padding={2} component="div">
        <Box component="div" py={2} display="flex" justifyContent="space-between" alignItems="center"  >
          <Typography variant="h6" gutterBottom>Connection Settings</Typography>
          <Button
            variant="contained"
            color="primary"
            // onClick={() => {
            //   setDrawerOpen(true);
            // }}
            onClick={handleClick}
            disableRipple
          >
            Add Connection
          </Button>
        </Box>
        <Popper
          // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
          sx={{ zIndex: 1200 }} // Ensure it appears above other elements
          open={open}
          anchorEl={anchorEl}
          placement={isSmallScreen ? "bottom-end" : "left-start"} // Adjust placement if necessary
          transition
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: 'center top', }}>
              <Paper elevation={4} sx={{ width: 450, height: isSmallScreen ? 300 : 'auto', overflowX: 'hidden', overflowY: isSmallScreen ? 'scroll' : 'auto', }} >
                <ConnectionForm onCancel={handleCancelPopper} />
              </Paper>
            </Grow>
          )}
        </Popper>
        <ConnectionSettingGrid columns={columns} rows={rows} />
      </Box>
      <Box component="div" padding={2}>
        <TextField
          fullWidth
          multiline
          minRows={4}
          label="Installation Credentials"
          name="installationCredentials"
          value={formik.values.installationCredentials}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.installationCredentials && Boolean(formik.errors.installationCredentials)}
          helperText={formik.touched.installationCredentials && formik.errors.installationCredentials}
          required
        />
      </Box>
      <Box component="div" padding={3}></Box>

    </Box>
  )
  return (
    <CModal visible={show} onClose={handleClose}>
      <CModalHeader>
        <CModalTitle>Edit User</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormLabel>Name</CFormLabel>
          <CFormInput
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
          />
          <CFormLabel>Email</CFormLabel>
          <CFormInput
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
          />
          <CFormLabel>Role</CFormLabel>
          <CFormInput
            type="text"
            name="role"
            value={editedUser.role}
            onChange={handleChange}
          />
          <CFormLabel>Country</CFormLabel>
          <CFormInput
            type="text"
            name="country"
            value={editedUser.country}
            onChange={handleChange}
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleClose}>Cancel</CButton>
        <CButton color="primary" onClick={() => handleSave(editedUser)}>Save changes</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default CustomerForm;
