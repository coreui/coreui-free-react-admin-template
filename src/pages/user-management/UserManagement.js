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
import EditUserModal from './EditUserForm';
import DialogBox from '../../components/common/DialogBox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserList } from '../../slices/userSlice';

const UserManagement = () => {

  const dispatch = useDispatch();
  const { userList, user } = useSelector((state) => state.user);
  console.log("User List:", userList);
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
  // useEffect(() => {
  //   if (user) {
  //   dispatch(fetchUserList());
  //   }
  // }, [userList]);

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

  const generateColumnsFromData = (data) => {
    if (!data || data.length === 0) {
      return [];
    }
  
    const keys = Object.keys(data[0]).filter(key => key !== 'id');
    return keys.map(key => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize header names
      editable: false,
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        
        if (params.row.userType === "Customer" && key === "customer") {
          const customer = params.row[key];
          return customer ? (
            <div>
              <p>{customer.customerName}</p>
              <p>{customer.projectType}</p>
            </div>
          ) : (
            <p>No customer info</p>
          );
        }
        return params.row[key]; 
      },
    }));
  };
  

 //MUI DataGrid 
  return (
    <div ref={dataGridRef}>
      <Box padding={1}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">User Management</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setDrawerOpen(true);
                }}
                disableRipple
              >
                Create User
              </Button>
            </Box>
            <Box width="100%" height="100%">
              <DataGrid
                rows={userList}
                columns={generateColumnsFromData(userList)}
                autoHeight
                disableColumnMenu
                disableRowSelectionOnClick
                hideFooterPagination
                getRowId={(row) => row.id}
                showCellVerticalBorder
                showColumnVerticalBorder
              />
            </Box>

          </CardContent>
        </Card>

        <EditContainer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <EditUserModal onClose={() => setDrawerOpen(false)} handleOpenDialog={handleOpenDialog} />
          <DialogBox open={dialogOpen} handleCloseDialog={handleCloseDialog} />
        </EditContainer>


      </Box>
    </div>
  );
};

export default UserManagement;
