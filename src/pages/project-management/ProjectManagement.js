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
    IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import EditContainer from '../../components/common/EditContainer';
import ContactForm from '../customer-master/contact-details/ContactForm';
import DialogBox from '../../components/common/DialogBox';
import ProjectForm from './ProjectForm';
import { useSelector } from 'react-redux';
import MyAlert from '../../components/common/Alert';
import { deleteProject } from '../../slices/projectSlice';
import { showAlert } from '../../slices/alertSlice';
import { showPopup } from '../../slices/popoverSlice';
import DeletePopover from '../../components/common/DeletePopover';



const ProjectManagement = () => {

    const { projectList } = useSelector(state => state.project);

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
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    const [anchorEl, setAnchorEl] = useState(null); 
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

    const handleDeleteClick = (event, row) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget); // Capture the button element as anchorEl
        dispatch(showPopup(row));
    }

    const handlePopoverClose = (event, reason) => {
        setAnchorEl(null); // Reset the anchorEl to close the popover 
      };

    const handleDelete = (id) => {
        dispatch(deleteProject(id));
        const alert ={
            open: true,
            message: "Project deleted successfully",
            severity: "success",
        };
        dispatch(showAlert(alert)); 
        handlePopoverClose();   
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const columns = [
        {
            field: 'actions',
            headerName: '',
            renderHeader: () => (
                <strong></strong>

            ),
            flex: 1,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        size="small"
                        variant="contained"
                        color="primary"
                    // onClick={() => handleEditClick(params.row)}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={(event) => handleDeleteClick(event, params.row)}
                    >
                        <Delete />
                    </IconButton>
                    <DeletePopover anchorEl={anchorEl} handleClose={handlePopoverClose} handleDelete={handleDelete} />
                </Box>
            ),
            minWidth: 150,
        },
        {
            field: 'projectType',
            headerName: 'Project Type',
            renderHeader: () => (
                <strong>Project Type</strong>

            ),
            flex: 1,
            minWidth: 150
        },
        {
            field: 'fromDate',
            headerName: 'From Date',

            renderHeader: () => (
                <strong>From Date</strong>

            ),
            flex: 1,
            minWidth: 150
        },
        {
            field: 'status',
            headerName: 'Status',
            renderHeader: () => (
                <strong>Status</strong>

            ),
            flex: 1,
            minWidth: 150
        },
        {
            field: 'toDate',
            headerName: 'To Date',
            renderHeader: () => (
                <strong>To Date</strong>

            ),
            flex: 1,
            minWidth: 150
        },
        {
            field: 'customer',
            headerName: 'Customer',
            renderHeader: () => (
                <strong>Customer</strong>

            ),
            renderCell: (params) => {

                const customer = params.row.customer;
                return customer ? (
                    <div>
                        <p>{customer.customerName}</p>
                        <p>{customer.projectType}</p>
                    </div>
                ) : (
                    <p>No customer info</p>
                );
            },
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'additionalHours',
            headerName: 'Additional Hours',
            renderHeader: () => (
                <strong>Additional Hours</strong>

            ),
            flex: 1,
            minWidth: 150
        },
        {
            field: 'projectName',
            headerName: 'Project Name',
            renderHeader: () => (
                <strong>Project Name</strong>

            ),
            flex: 1,
            minWidth: 150
        },
        {
            field: 'projectNameInEnglish',
            headerName: 'Project Name In English',
            renderHeader: () => (
                <strong>Project Name In English</strong>

            ),
            flex: 1,
            minWidth: 150
        },
        {
            field: 'projectMethod',
            headerName: 'Project Method',
            renderHeader: () => (
                <strong>Project Method</strong>

            ),
            flex: 1,
            minWidth: 150
        },
        {
            field: 'budget',
            headerName: 'Budget',
            renderHeader: () => (
                <strong>Budget</strong>

            ),
            flex: 1,
            minWidth: 150
        },
        {
            field: 'consumedHours',
            headerName: 'Consumed Hours',
            renderHeader: () => (
                <strong>Consumed Hours</strong>

            ),
            flex: 1,
            minWidth: 150
        },
        {
            field: 'balanceHours',
            headerName: 'Balance Hours',
            renderHeader: () => (
                <strong>Balance Hours</strong>

            ),
            flex: 1,
            minWidth: 150
        },

    ];

    const rows = projectList;

    return (

        <Box padding={1}>
            <Box display="flex" justifyContent="center" alignItems="center" mb={2} width="100%">
                <MyAlert />
            </Box>
            <Card>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Project Master </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setDrawerOpen(true);
                            }}
                            disableRipple
                        >
                            Create New Project
                        </Button>
                    </Box>

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
                            height: 'calc(100vh - 300px)',
                        }}

                    />


                </CardContent>
            </Card>

            <EditContainer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <ProjectForm onClose={() => setDrawerOpen(false)} />
                <DialogBox open={dialogOpen} handleCloseDialog={handleCloseDialog} />
            </EditContainer>


        </Box>
    );
};

export default ProjectManagement;
