import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox, Box, useTheme, Typography, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AutoCompleteDataGrid from '../../components/common/AutoCompleteDataGrid';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';  
import { createHours } from '../../slices/hoursSlice';


const HourForm = ({ isEditContact, onClose }) => {

    const dispatch = useDispatch(); 
    const {hoursList} = useSelector((state) => state.hours);        

    const theme = useTheme();

    const formik = useFormik({
        initialValues: {
            orderNum: '',
            hours: '',
            user: null,
            comment: '',  
        },
        validationSchema: Yup.object({
            orderNum: Yup.string().required('Required'),
            hours: Yup.string().required('Required'),
            user: Yup.mixed().required('Please select user'), 
            comment: Yup.string().required('Required'),   

        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            dispatch(createHours(values));
            resetForm();    

        },

    });



    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            renderHeader: () => (
                <strong>ID</strong>
            ),
            width: 100,
        },
        {
            field: 'orderNum',
            headerName: 'Order Number',
            renderHeader: () => (
                <strong>Order Number</strong>
            ),
            width: 200,
        },
        {
            field: 'hours',
            headerName: 'Hours',
            renderHeader: () => (
                <strong>Hours</strong>
            ),
            width: 200,
        },
        {
            field: 'user',
            headerName: 'User',
            renderHeader: () => (
                <strong>User</strong>
            ),
            width: 200,
        },
        {
            field: 'dateTime',
            headerName: 'Date',
            renderHeader: () => (
                <strong>Date</strong>
            ),
            width: 200,
        },
        {
            field: 'comment',
            headerName: 'Comment',
            renderHeader: () => (
                <strong>Comment</strong>
            ),
            width: 200, 
        }
    ]

    const rows = hoursList;

    const userColumns = ["User Name"]; // Corrected typo
    const userRows = [
        { id: 1, contactName: 'John Doe' },
        { id: 2, contactName: 'Jane Smith' },
        { id: 3, contactName: 'Sam Brown' },
        { id: 4, contactName: 'Alice Johnson' },
        { id: 5, contactName: 'Michael Lee' },

    ];

    return (
        <Box component="div" height= '100vh'>
            <Box component="div" sx={{ ...theme.formControl.formHeaderOuterContainer }}>
                <Box component="div" sx={{ ...theme.formControl.formHeaderContainer }}>
                    <Typography variant="h6" gutterBottom>
                        {isEditContact ? 'Edit Hour' : 'Add Hour'}
                    </Typography>
                    <Box componet="div" sx={{ ...theme.formControl.formHeaderButtonContainer }}>
                        <Button
                            onClick={onClose}
                            variant="contained"
                            color="secondary"
                            style={{ marginRight: 8, backgroundColor: '#757575', color: 'white', padding: '3px 6px' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={formik.handleSubmit}
                            sx={{ padding: '3px 6px' }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
                <Divider sx={{ background: 'black' }} />
            </Box>
            <Box component="form" sx={{ ...theme.formControl.formComponent }} onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            id="orderNum"
                            name="orderNum"
                            label="Order Number"
                            value={formik.values.orderNum}
                            onChange={formik.handleChange}
                            error={formik.touched.orderNum && Boolean(formik.errors.orderNum)}
                            helperText={formik.touched.orderNum && formik.errors.orderNum}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            id="hours"
                            name="hours"
                            label="hours"
                            value={formik.values.hours}
                            onChange={formik.handleChange}
                            error={formik.touched.hours && Boolean(formik.errors.hours)}
                            helperText={formik.touched.hours && formik.errors.hours}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12 }}>
                        <AutoCompleteDataGrid
                            label="Select User"
                            columns={userColumns}
                            rows={userRows}
                            value={formik.values.user || ''}
                            onChange={(event, value) => {
                                console.log("value", value);
                                formik.setFieldValue('user', value);
                            }}
                            onBlur={() => formik.setFieldTouched('user', true)}
                            error={formik.touched.user && Boolean(formik.errors.user)}
                            helperText={formik.touched.user && formik.errors.user}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12}}>
                        <TextField
                            fullWidth
                            multiline 
                            rows={3}  
                            id='comment'
                            name='comment'  
                            label='Comment'
                            value={formik.values.comment}   
                            onChange={formik.handleChange}  
                            onBlur={formik.handleBlur}  
                            error={formik.touched.comment && Boolean(formik.errors.comment)}
                            helperText={formik.touched.comment && formik.errors.comment}
                        />

                    </Grid>

                </Grid>
            </Box>
            <Box component="div" paddingY={0} paddingX={2}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    disableColumnMenu
                    disableRowSelectionOnClick
                    hideFooterPagination
                    getRowId={(row) => row.id}
                    showCellVerticalBorder
                    showColumnVerticalBorder
                    sx={{
                        maxHeight: 350,
                    }}
                />
            </Box>
        </Box>
    );
};

export default HourForm;