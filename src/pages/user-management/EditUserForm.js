import React, { useState } from 'react'
import { Box, Typography, TextField, Button, MenuItem, Divider } from '@mui/material'
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
import { userDTO } from '../../dto/userDTO';
const userTypes = ["None", "Admin", "Consultant", "Customer"];
const consultantTypes = ["Technical", "Functional", "Implementation", "Support", "Development"];
const positions = ["Manager", "Senior", "Junior"];
const statuses = ["Active", "Inactive"];
const languages = ["English", "Hebrew"];
const lockStatuses = ["Locked", "Unlocked"];

const EditUserModal = ({ user, show, handleClose, handleOpenDialog, onClose }) => {
  const dispatch = useDispatch();
  const [editedUser, setEditedUser] = useState(user)
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    userType: '',
    name: '',
    officeEmailId: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    joiningDate: '',
    consultantType: '',
    position: '',
    dateOfBirth: '',
    status: '',
    language: '',
    locked: '',
  });

  const formik = useFormik({
    initialValues: formData,
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(createUser(values));
      setFormData(userDTO); // Clear form data
      // handleOpenDialog()
    },
  });


  const handleButtonClick = () => {
    formik.handleSubmit();
    onClose();
  }


  return (
    <Box component="div">
      <Box component="div" py={1} px={2} display="flex" justifyContent="space-between" alignItems="center" position="sticky" top={0}
        zIndex={10}
        bgcolor="background.paper" >
        <Typography variant="h6" gutterBottom>
          {isEditMode ? 'Edit User' : 'Create New User'}
        </Typography>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Button
            onClick={onClose}
            variant="contained"
            style={{ marginRight: 8, backgroundColor: '#757575', color: 'white' }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" onClick={handleButtonClick} >
            {isEditMode ? 'Save Changes' : 'Create User'}
          </Button>
        </Box>
      </Box>
      <Divider sx={{background: 'black'}}/>
    <Box padding={2} mt={1} component="form" onSubmit={formik.handleSubmit}>
      
      <Grid container spacing={2}>
        <Grid size={{xs: 12, md: 6}} >
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
            {userTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        
        <Grid size={{xs: 12, md: 6}}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid size={{xs: 12, md: 6}}>
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
        <Grid size={{xs: 12, md: 6}}>
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
        <Grid size={{xs: 12, md: 6}}>
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
        <Grid size={{xs: 12, md: 6}}>
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
          formik.values.userType === 'Admin' || formik.values.userType === '' || formik.values.userType === 'Consultant' ? (
            <>
              <Grid size={{xs: 12, md: 6}}>
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
              <Grid size={{xs: 12, md: 6}}>
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
                  {consultantTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{xs: 12, md: 6}}>
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
                  {positions.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{xs: 12, md: 6}}>
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
              <Grid size={{xs: 12, md: 6}}>
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
                  {statuses.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{xs: 12, md: 6}}>
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
                  {languages.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{xs: 12, md: 6}}>
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
                  {lockStatuses.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </>
          ) : (
            <>
              <Grid size={{xs: 12, md: 6}}>
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
                  {statuses.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{xs: 12, md: 6}}>
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
              <Grid size={{xs: 12, md: 6}}>
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
                  {lockStatuses.map((type) => (
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
      {/* <Box mt={2} mb={2} display="flex" justifyContent="flex-end">
        <Button
          onClick={onClose}
          variant="contained"
          color="secondary"
          style={{ marginRight: 8 }}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" >
          {isEditMode ? 'Save Changes' : 'Create User'}
        </Button>
      </Box> */}
    </Box>
    <Box component="div" padding={4}></Box>
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

export default EditUserModal
