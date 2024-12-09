import React, { useState, useEffect, useRef } from 'react';
import {
    Button,
    Drawer,
    TextField,
    Typography,
    Box,
    Card,
    CardContent,
    Dialog,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DataGrid } from '@mui/x-data-grid';
import { Edit } from '@mui/icons-material';
import EditContainer from '../../../components/common/EditContainer';
import EditUserModal from '../../user-management/EditUserForm';
import DialogBox from '../../../components/common/DialogBox';
import AutoCompleteDataGrid from '../../../components/common/AutoCompleteDataGrid';
import ContactForm from './ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';


const ContactMainScreen = () => {
    const dispatch = useDispatch();
    const { contactList } = useSelector((state) => state.contacts);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        country: '',
    });

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [drawerStyles, setDrawerStyles] = useState({});
    const dataGridRef = useRef();

    // Fetch users from backend
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:3001/users');
            const data = await response.json();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    // Calculate Drawer Position and Height
    useEffect(() => {
        if (dataGridRef.current) {
            const rect = dataGridRef.current.getBoundingClientRect();
            setDrawerStyles({
                top: rect.top,
                height: `calc(100vh - ${rect.top}px)`,
            });
        }
    }, [users, drawerOpen]);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    }
    const handleCloseDialog = () => {
        setDialogOpen(false);
    }

    const formik = useFormik({
        initialValues: {
            customer: null,
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });


    const columns = [
        { field: 'contactName', headerName: 'Contact Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'phone', headerName: 'Phone', flex: 1 },
        { field: 'extension', headerName: 'Extension', flex: 1 },
        { field: 'cellular', headerName: 'Cellular', flex: 1 },
        { field: 'position', headerName: 'Position', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <Box>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                    // onClick={() => handleEditClick(params.row)}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                    // onClick={() => handleDelete(params.row.id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
        },
    ]

    const rows = contactList;

    return (

        <Box padding={1}>
            <Card>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Contact Person</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setDrawerOpen(true);
                            }}
                            disableRipple
                        >
                            Add New Contact
                        </Button>
                    </Box>
                    <Box component="div" sx={{ width: "100%", maxWidth: "300px", mb: 2 }}>

                        <AutoCompleteDataGrid
                            value={formik.values.customer || ''}
                            onChange={(event, value) => {
                                console.log("Value:", value);
                                formik.setFieldValue('customer', value);
                            }}
                            onBlur={() => formik.setFieldTouched('customer', true)}
                            error={formik.touched.customer && Boolean(formik.errors.customer)}
                            helperText={formik.touched.customer && formik.errors.customer}
                        />

                    </Box>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        autoHeight
                        disableColumnMenu
                        disableRowSelectionOnClick
                        hideFooterPagination
                        getRowId={(row) => row.id}
                        showCellVerticalBorder
                        showColumnVerticalBorder
                    />

                </CardContent>
            </Card>

            <EditContainer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <ContactForm onClose={() => setDrawerOpen(false)} />
                <DialogBox open={dialogOpen} handleCloseDialog={handleCloseDialog} />
            </EditContainer>


        </Box>
    );
};

export default ContactMainScreen;
