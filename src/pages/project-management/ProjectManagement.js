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
import EditContainer from '../../components/common/EditContainer';
import ContactForm from '../customer-master/contact-details/ContactForm';
import DialogBox from '../../components/common/DialogBox';
import ProjectForm from './ProjectForm';



const ProjectManagement = () => {
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
    ];

    const rows = users;

    return (

        <Box padding={1}>
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
                        autoHeight
                        disableColumnMenu
                        disableRowSelectionOnClick
                        hideFooterPagination
                        getRowId={(row) => row.id}
                    />

                </CardContent>
            </Card>

            <EditContainer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <ProjectForm onClose={() => setDrawerOpen(false)}  />
                <DialogBox open={dialogOpen} handleCloseDialog={handleCloseDialog} />
            </EditContainer>


        </Box>
    );
};

export default ProjectManagement;
