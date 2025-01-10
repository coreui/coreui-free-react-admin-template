import React, { useState } from 'react'
import { Box, Typography, TextField, Button, Popper, Divider, Paper, Grow, IconButton, Tooltip, MenuItem } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Formik, useFormik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
import { Add, Delete, Edit } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { createCustomer } from '../../slices/customerSlice';
import { ContactPersons, ProjectTypes } from '../../components/common/utils';
import MyAlert from '../../components/common/Alert';
import { deleteConnection } from '../../slices/connectionSlice';
import { showAlert } from '../../slices/alertSlice';
import { showPopup } from '../../slices/popoverSlice';
import DeletePopover from '../../components/common/DeletePopover';
import PopperComponent from '../../components/common/popper';
import AutoCompleteDataGrid from '../../components/common/AutoCompleteDataGrid';
import ContactForm from '../../components/common/ContactForm';
import { customerDTO } from '../../dto/customerDTO';


// const userTypes = ["None", "Admin", "Consultant", "Customer"];
// const consultantTypes = ["Technical", "Functional", "Implementation", "Support", "Development"];
// const positions = ["Manager", "Senior", "Junior"];
// const statuses = ["Active", "Inactive"];
// const languages = ["English", "Hebrew"];
// const lockStatuses = ["Locked", "Unlocked"];

const CustomerForm = ({ user, show, handleClose, onClose }) => {

  const dispatch = useDispatch();
  const {connectionList} = useSelector(state => state.connection)
  console.log("Connection List:", connectionList);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [isOpenContact, setIsOpenContact] = useState(false);
  const [isEditContact, setIsEditContact] = useState(false);
  const [anchorElm, setAnchorElm] = useState(null);
  const [editedUser, setEditedUser] = useState(user)
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({...customerDTO});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  })
  const [anchorElement, setAnchorElement] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));


  const formik = useFormik({
    initialValues: formData,
    validationSchema: customerValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(createCustomer({ customerObj: values, connections: connectionList }));
      const alert ={
        open: true,
        message: "Customer created successfully",
        severity: "success",
      };
      dispatch(showAlert(alert));
      onClose();

     
    },
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Correctly sets the anchor element
    setOpen((prev) => !prev); // Toggles the Popper
  };

  const handleCancelPopper = () => {
    setOpen(false);
  };

  const handleDeleteClick = (event, row) => {
    event.stopPropagation();
    setAnchorElement(event.currentTarget); // Capture the button element as anchorEl
    dispatch(showPopup(row));
  }

  const handlePopoverClose = (event, reason) => {
    setAnchorElement(null); // Reset the anchorEl to close the popover 
  };

  const handleDelete = (id) => {
    dispatch(deleteConnection(id));
    const alert ={
      open: true,
      message: "Connection deleted successfully",
      severity: "success",
    };
    dispatch(showAlert(alert)); 
    handlePopoverClose();
  }

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleAddContactButtonClick = (event) => {
    setAnchorElm(event.currentTarget); // Correctly sets the anchor element
    setIsOpenContact((prev) => !prev); // Toggles the Popper
    setIsEditContact(false);
  };

  const handleEditContactButtonClick = (event) => {
    setAnchorElm(event.currentTarget); // Correctly sets the anchor element
    setIsOpenContact((prev) => !prev); // Toggles the Popper
    setIsEditContact(true);
  };

  const handleCloseContactPopper = () => {
    setIsOpenContact(false);
  };


  const columns = [
    { 
      field: 'connectionType', 
      headerName: 'Connection Type', 
      renderHeader: () => <strong>Connection Type</strong>, 
      flex: 1 
    },
    { 
      field: 'vpnType', 
      headerName: 'VPN Type',
      renderHeader: () => <strong>VPN Type</strong>, 
      flex: 1 
    },
    { 
      field: 'address', 
      headerName: 'Address', 
      renderHeader: () => <strong>Address</strong>,
      flex: 1 
    },
    { 
      field: 'user', 
      headerName: 'User',
      renderHeader: () => <strong>User</strong>,   
      flex: 1 
    },
    { 
      field: 'password', 
      headerName: 'Password',
      renderHeader: () => <strong>Password</strong>,   
      flex: 1 
    },
    { 
      field: 'comments', 
      headerName: 'Comments',
      renderHeader: () => <strong>Comments</strong>,   
      flex: 1 
    },
    {
      field: 'actions',
      headerName: '',
      renderHeader: () => <strong></strong>,
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Tooltip title={"Delete"}>
            <IconButton
              size="small"
              variant="contained"
              color="primary"
              title="Delete"
              onClick={(event) => handleDeleteClick(event, params.row)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
          <DeletePopover anchorEl={anchorElement} handleClose={handlePopoverClose} handleDelete={handleDelete} /> 
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

  const contactColumns = ["Contact Name"]; // Corrected typo
  const contactRows = [
    { id: 1, contactName: 'John Doe' },
    { id: 2, contactName: 'Jane Smith' },
    { id: 3, contactName: 'Sam Brown' },
    { id: 4, contactName: 'Alice Johnson' },
    { id: 5, contactName: 'Michael Lee' },

  ];


  return (
    <Box component="div">
      <Box display={snackbar.open ? "flex" : "none"} justifyContent="center" alignItems="center" mb={2} width="100%" >
          <MyAlert snackbar={snackbar} onClose={handleCloseSnackbar} />
      </Box>
      <Box component="div" sx={{ ...theme.formControl.formHeaderOuterContainer }}>
        <Box component="div" sx={{ ...theme.formControl.formHeaderContainer }}>
          <Typography variant="h6" gutterBottom>
            {isEditMode ? 'Edit Customer' : 'Create New Customer'}
          </Typography>
          <Box componet="div" sx={{ ...theme.formControl.formHeaderButtonContainer }}>
            <Button
              onClick={onClose}
              variant="contained"
              color="secondary"
              style={{ marginRight: 8, backgroundColor: '#757575', color: 'white' }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" onClick={formik.handleSubmit} >
              {isEditMode ? 'Save Changes' : 'Create Customer'}
            </Button>
          </Box>
        </Box>
        <Divider sx={{ background: 'black' }} />
      </Box>

      <Box component="form" sx={{ ...theme.formControl.formComponent }} onSubmit={formik.handleSubmit} >
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
          {/* <Grid size={{ xs: 12, md: 6 }}>

            <Grid xs={12} md={6}>
              <Autocomplete
                fullWidth
                multiple
                options={ContactPersons} // Array of options
                getOptionLabel={(option) => option.label} // How to display each option
                value={formik.values.contactPerson} // Bind to Formik state
                onChange={(event, value) => {
                  formik.setFieldValue('contactPerson', value); // Update Formik state with selected options
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Contact Person"
                    name="contactPerson"
                    onBlur={formik.handleBlur}
                    error={formik.touched.contactPerson && Boolean(formik.errors.contactPerson)}
                    helperText={formik.touched.contactPerson && formik.errors.contactPerson}
                    required
                  />
                )}
              />
            </Grid>

          </Grid> */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <Grid container spacing={2}>
              <Grid item size={{ xs: 12, md: 8 }}>
                <AutoCompleteDataGrid
                  label="Select Contact Person"
                  columns={contactColumns}
                  rows={contactRows}
                  value={formik.values.contactPerson || ''}
                  onChange={(event, value) => {
                    console.log("value", value);
                    formik.setFieldValue('contactPerson', value);
                  }}
                  onBlur={() => formik.setFieldTouched('contactPerson', true)}
                  error={formik.touched.contactPerson && Boolean(formik.errors.contactPerson)}
                  helperText={formik.touched.contactPerson && formik.errors.contactPerson}
                  disabled={false}
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 4 }} justifyContent="center" alignItems="center">
                {/* form and module */}
                <Box py={1}>
                  <IconButton
                    size='small'
                    variant="contained"
                    color='primary'
                    // sx={{
                    //   color: 'white',
                    // }}
                    onClick={handleAddContactButtonClick}
                    disableRipple
                  >
                    <Add />
                  </IconButton>
                  <IconButton
                    size='small'
                    color='primary'
                    variant="contained"
                    onClick={handleEditContactButtonClick}
                    disableRipple>
                    <Edit />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
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
              select
              label="Project Type"
              name="projectType"
              value={formik.values.projectType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.projectType && Boolean(formik.errors.projectType)}
              helperText={formik.touched.projectType && formik.errors.projectType}
              required
              
            >
              {
                ProjectTypes.map((option) => (
                  <MenuItem key={option.id} >
                    {option.label}
                  </MenuItem>
                ))

              }
            </TextField>
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
        <PopperComponent open={isOpenContact} anchorEl={anchorElm}>
          <ContactForm isEditContact={isEditContact} onClose={handleCloseContactPopper} page={"popupScreen"} />
        </PopperComponent>
      </Box>
      <Divider sx={{ bgcolor: "black" }} />
      <Box padding={2} component="div">
        <Box component="div" py={2} display="flex" justifyContent="space-between" alignItems="center"  >
          <Typography variant="h6" gutterBottom>Connection Settings</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            disableRipple
          >
            Add Connection
          </Button>
        </Box>
        <Popper
          sx={{ zIndex: 1200 }}
          open={open}
          anchorEl={anchorEl}
          placement={isSmallScreen ? "bottom-end" : "left-start"}
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
      <Box component="div" sx={{height: "auto"}} padding={2} mb={2}>
        <Typography variant="h6" gutterBottom>Installation Credentials</Typography>
        <ReactQuill theme='snow' 
          value={formik.values.installationCredentials} 
          onChange={(value) => formik.setFieldValue('installationCredentials', value)} 
          style={{ height: '90px', marginBottom: 16 }} 
        />
      </Box>
      <Box component="div" padding={4} mt={2}></Box>
    </Box>
  )
  
}

export default CustomerForm;
