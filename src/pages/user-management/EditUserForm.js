import React, { useState } from 'react'
import { Box, Typography, TextField, Button, MenuItem, Divider, useTheme } from '@mui/material'
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
import userValidationSchema from './userValidationSchema';
import Grid from '@mui/material/Grid2';
import AutoCompleteDataGrid from '../../components/common/AutoCompleteDataGrid';
import { createUser } from '../../slices/userSlice';
import { buildUserDTO, userDTO } from '../../dto/userDTO';
import { ConsultantTypes, Languages, LockStatus, Positions, Status, UserTypeArray, userTypeObj } from '../../components/common/utils';
import { showAlert } from '../../slices/alertSlice';


const EditUserModal = ({ user, show, handleClose, handleOpenDialog, onClose }) => {
  const dispatch = useDispatch();
  const [editedUser, setEditedUser] = useState(user)
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    userType: '',
    firstName: '',
    lastName: '',
    username: '',
    officeEmailId: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    customerName: null, // Only for customer
    joiningDate: '',
    consultantType: '',
    position: '',
    dateOfBirth: '',
    status: '',
    language: '',
    locked: '',
  });

  const theme = useTheme();

  const formik = useFormik({
    initialValues: formData,
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      const userObj = buildUserDTO(values);
      //dispatch(createUser(userObj));
      // handleOpenDialog()
      const alert = {
        open: true,
        message: 'User Created Successfully!',
        severity: 'success',  
      }
      dispatch(showAlert(alert)); 
      onClose();
    },
  });

  const autoCompleteDataGridColumns = ["Customer Name", "Project Type"];
  const autoCompleteDataGridRows = [
    { id: 1, customerName: 'John Doe', projectType: 'Web Development' },
    { id: 2, customerName: 'Jane Smith', projectType: 'Mobile App' },
    { id: 3, customerName: 'Sam Brown', projectType: 'Data Analysis' },
    { id: 4, customerName: 'Alice Johnson', projectType: 'SEO Optimization' },
    { id: 5, customerName: 'Michael Lee', projectType: 'Cloud Computing' },
  ];


  return (
    <Box component="div">
      <Box component="div" sx={{ ...theme.formControl.formHeaderOuterContainer }}>
        <Box component="div" sx={{ ...theme.formControl.formHeaderContainer }} >
          <Typography variant="h6" gutterBottom>
            {isEditMode ? 'Edit User' : 'Create New User'}
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
              {isEditMode ? 'Save Changes' : 'Create User'}
            </Button>
          </Box>
        </Box>
        <Divider sx={{ background: 'black' }} />
      </Box>
      <Box sx={{ ...theme.formControl.formComponent }} component="form" onSubmit={formik.handleSubmit}>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }} >
            <TextField
              select
              fullWidth
              label="User Type"
              name="userType"
              value={formik.values.userType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.userType && Boolean(formik.errors.userType)} //grid v2
              helperText={formik.touched.userType && formik.errors.userType}
            >
              {UserTypeArray.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="User Name"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Office Email ID"
              name="officeEmailId"
              value={formik.values.officeEmailId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.officeEmailId && Boolean(formik.errors.officeEmailId)}
              helperText={formik.touched.officeEmailId && formik.errors.officeEmailId}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Mobile"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </Grid>
          {
            formik.values.userType === userTypeObj.ADMIN || formik.values.userType === '' || formik.values.userType === userTypeObj.CONSULTANT || formik.values.userType === userTypeObj.NONE ? (
              <>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Joining Date"
                    name="joiningDate"
                    type="date"
                    value={formik.values.joiningDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.joiningDate && Boolean(formik.errors.joiningDate)}
                    helperText={formik.touched.joiningDate && formik.errors.joiningDate}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Consultant Type"
                    name="consultantType"
                    value={formik.values.consultantType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.consultantType && Boolean(formik.errors.consultantType)}
                    helperText={formik.touched.consultantType && formik.errors.consultantType}
                  >
                    {ConsultantTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Position"
                    name="position"
                    value={formik.values.position}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.position && Boolean(formik.errors.position)}
                    helperText={formik.touched.position && formik.errors.position}
                  >
                    {Positions.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                    helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Status"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    helperText={formik.touched.status && formik.errors.status}
                  >
                    {Status.map((type) => (
                      <MenuItem key={type} value={type.id}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Language"
                    name="language"
                    value={formik.values.language}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.language && Boolean(formik.errors.language)}
                    helperText={formik.touched.language && formik.errors.language}
                  >
                    {Languages.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Locked"
                    name="locked"
                    value={formik.values.locked}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.locked && Boolean(formik.errors.locked)}
                    helperText={formik.touched.locked && formik.errors.locked}
                  >
                    {LockStatus.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </>
            ) : (
              <>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Status"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    helperText={formik.touched.status && formik.errors.status}
                  >
                    {Status.map((obj) => (
                      <MenuItem key={obj.id} value={obj.id}>
                        {obj.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <AutoCompleteDataGrid
                    label="Select Customer"
                    columns={autoCompleteDataGridColumns}
                    rows={autoCompleteDataGridRows} 
                    value={formik.values.customerName || ''}
                    onChange={(event, value) => {
                      console.log("Value:", value);
                      formik.setFieldValue('customerName', value);
                    }}
                    onBlur={() => formik.setFieldTouched('customerName', true)}
                    error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                    helperText={formik.touched.customerName && formik.errors.customerName}
                  />

                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Locked"
                    name="locked"
                    value={formik.values.locked}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.locked && Boolean(formik.errors.locked)}
                    helperText={formik.touched.locked && formik.errors.locked}
                  >
                    {LockStatus.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

              </>
            )
          }

        </Grid>

      </Box>
      <Box component="div" padding={4}></Box>
    </Box>
  )

}

export default EditUserModal
