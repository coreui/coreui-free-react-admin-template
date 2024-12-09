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
import { useDispatch, useSelector } from 'react-redux';  
import { fetchCustomerList } from '../../slices/customerSlice';

const ClientManagement = () => {

  const dispatch = useDispatch();
  const {customerList, status} = useSelector((state) => state.customer); 
  console.log("Status:", status);  
  console.log("Customer List:", customerList);

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
    dispatch(fetchCustomerList());
  }, [customerList]);

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

  const rows = customerList || [];

  //to fetch columns from api data
  const generateColumnsFromData = (data) => {
    if (!data || data.length === 0) {
      return [];
    }

    const keys = Object.keys(data[0]).filter(key => key !== 'id' && key !== 'contactPerosn' && key !== 'connections');  
    return keys.map(key => ({
      field: key,
      headerName: key,
      editable: false,
      flex: 1,
      minWidth: 200,
    }));
  }

  const columns = [
    { field: 'customerName', headerName: 'Customer Name', width: 150 },
    { field: 'customerNameInEnglish', headerName: 'Customer Name (English)', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
    { field: 'country', headerName: 'Country', width: 150 },
    { field: 'projectType', headerName: 'Project Type', width: 150 },
    { field: 'siteLocation', headerName: 'Site Location', width: 150 },
    { field: 'distanceInKm', headerName: 'Distance (Km)', width: 150 },
    { field: 'SAPVersion', headerName: 'SAP Version', width: 150 },
    { field: 'SAPCode', headerName: 'SAP Code', width: 150 },
    { field: 'controlCenterUser', headerName: 'Control Center User', width: 200 },
    {
        field: 'contactPerson',
        headerName: 'Contact Person',
        width: 200,
        valueGetter: (params) => {
          console.log("params.row", params.row);  
          console.log("params.row.contactPerson", params.row?.contactPerson);  
          
          return params.row?.contactPerson && params.row?.contactPerson.length > 0
            ? params.row.contactPerson.map((person) => person.label).join(', ') 
            : 'N/A'; 
        }
      },
      
    {
      field: 'connections',
      headerName: 'Connections',
      width: 300,
      renderCell: (params) => (
        <Box>
          {params.row?.connections?.length > 0 ? (
            params.row.connections.map((conn, index) => (
              <Box key={index}>
                <strong>{conn.connectionType}:</strong> {conn.address}
              </Box>
            ))
          ) : (
            <span>N/A</span>
          )}
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
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
  // const tempColumn = [
  //   { field: 'id', headerName: 'ID', flex: 1 },
  //   { field: 'user', headerName: 'User', flex: 1 },
  //   { field: 'country', headerName: 'Country', flex: 1 },
  //   { field: 'role', headerName: 'Role', flex: 1 },
  //   {
  //     field: 'actions',
  //     headerName: 'Actions',
  //     flex: 1,
  //     renderCell: (params) => (
  //       <Box>
  //         <Button
  //           size="small"
  //           variant="contained"
  //           color="primary"
  //         // onClick={() => handleEditClick(params.row)}
  //         >
  //           Edit
  //         </Button>
  //         <Button
  //           size="small"
  //           variant="contained"
  //           color="secondary"
  //         // onClick={() => handleDelete(params.row.id)}
  //         >
  //           Delete
  //         </Button>
  //       </Box>
  //     ),
  //   },
  // ];

  // const girdColumns = [
  //   {...columns},
  //   {
  //     field: 'actions',
  //     headerName: 'Actions',
  //     flex: 1,
  //     renderCell: (params) => (
  //       <Box>
  //         <Button
  //           size="small"
  //           variant="contained"
  //           color="primary"
  //         // onClick={() => handleEditClick(params.row)}
  //         >
  //           Edit
  //         </Button>
  //         <Button
  //           size="small"
  //           variant="contained"
  //           color="secondary"
  //         // onClick={() => handleDelete(params.row.id)}
  //         >
  //           Delete
  //         </Button>
  //       </Box>
  //     ),
  //   },
  // ];


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
              showCellVerticalBorder
              showColumnVerticalBorder
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
