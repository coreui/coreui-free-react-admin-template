import React, { useState } from "react";
import { Box, Paper, TextField, Typography, Button, MenuItem, Grid2, Autocomplete } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createConnection } from "../../slices/connectionSlice";
import { ConnectionTypes, VPNTypes } from "../../components/common/utils";
import { showAlert } from "../../slices/alertSlice";




const ConnectionForm = ({ onSave, onCancel }) => {
  const dispatch = useDispatch()
  const [connectionData, setConnectionData] = useState({
    connectionType: 'VPN',
    vpnType: '',
    address: '',
    user: '',
    password: '',
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConnectionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(connectionData);
    onCancel();
  };

  const formik = useFormik({
    initialValues: connectionData,
    onSubmit: (values) => {
      console.log(values);
      dispatch(createConnection(values));
      const alert = {
        open: true,
        message: "Connection created successfully",
        severity: "success",
      };
      dispatch(showAlert(alert));
      onCancel();
    },
  });

  const renderingFields = (connectionType) => {
    switch (connectionType) {
      case 'VPN':
        return (
          <>
            <Grid2 size={{ xs: 12, md: 6 }} mt={2}>
              <Autocomplete
                freeSolo
                options={VPNTypes}
                value={formik.values.vpnType} // Value from Formik
                onChange={(event, value) => {
                  formik.setFieldValue('vpnType', value); // Update Formik's value when selection or custom input changes
                }}
                onInputChange={(event, newValue) => {
                  if (event && event.type === 'change') {
                    formik.setFieldValue('vpnType', newValue); // Update Formik's value when input changes
                  }
                }}
                getOptionLabel={(option) => option || ''} // Each option is a string
                renderInput={(params) => <TextField {...params} label="VPN Type" variant="outlined" />}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, md: 12 }}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                margin="normal"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="User"
                name="user"
                margin="normal"
                value={formik.values.user}
                onChange={formik.handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                margin="normal"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Grid2>

          </>
        );
      case 'Remote Desktop':
        return (
          <>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                margin="normal"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="User"
                name="user"
                margin="normal"
                value={formik.values.user}
                onChange={formik.handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                margin="normal"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Grid2>
          </>
        );
      case 'SAP':
        return (
          <>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="User"
                name="user"
                margin="normal"
                value={formik.values.user}
                onChange={formik.handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 12 }}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                margin="normal"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Grid2>
          </>
        );
      case 'SQL':
        return (
          <>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="User"
                name="user"
                margin="normal"
                value={formik.values.user}
                onChange={formik.handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 12 }}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                margin="normal"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Grid2>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <Paper elevation={3} style={{ padding: '16px', maxWidth: '500px' }}>
      <Typography variant="h6">Add Connection</Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Grid2 container columnSpacing={1}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Connection Type"
              name="connectionType"
              margin="normal"
              value={formik.values.connectionType}
              // defaultValue={formik.values.connectionType === '' ? 'VPN' : formik.values.connectionType} 
              onChange={formik.handleChange}
              select
            >
              {ConnectionTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid2>

          {renderingFields(formik.values.connectionType)}
          <Grid2 size={{ xs: 12, md: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Comments"
              name="comments"
              margin="normal"
              value={formik.values.comments}
              onChange={formik.handleChange}
            />
          </Grid2>

        </Grid2>
      </Box>

      <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
        <Button variant="text" style={{ backgroundColor: '#757575', color: 'white' }} onClick={onCancel}>Cancel</Button>
        <Button type="submit" onClick={formik.handleSubmit} variant="contained" color="primary">Save</Button>
      </Box>
    </Paper>
  );
};

export default ConnectionForm;
