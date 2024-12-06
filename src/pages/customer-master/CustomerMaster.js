import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Drawer,
  Grid,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  Dialog,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit } from '@mui/icons-material';
import EditContainer from '../../components/common/EditContainer';
import DialogBox from '../../components/common/DialogBox';
import CustomerForm from './CustomerForm';
import { getCustomerList } from '../../components/common/apiCalls';

const ClientManagement = () => {
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
    const fetchData = async () => {
    const response = await getCustomerList();
    console.log(response);
    }
    fetchData();
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
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'user', headerName: 'User', flex: 1 },
    { field: 'country', headerName: 'Country', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
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
    <div ref={dataGridRef}>
      <Box padding={1}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Customer Master</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setDrawerOpen(true);
                }}
                disableRipple
              >
                Create Customer
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
          {/* <EditUserModal onClose={() => setDrawerOpen(false)} handleOpenDialog={handleOpenDialog} /> */}
            <CustomerForm onClose={() => setDrawerOpen(false)}  />
          <DialogBox open={dialogOpen} handleCloseDialog={handleCloseDialog} />
        </EditContainer>


      </Box>
    </div>
  );
};

export default ClientManagement;
