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
  IconButton,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { userTypeObj } from '../../components/common/utils';
import EditContainer from '../../components/common/EditContainer';
import TaskForm from '../task-management/TaskForm';
import TimeForm from './TimeForm';
import { deleteTimeSheet } from '../../slices/timeSheetSlice';
import MyAlert from '../../components/common/Alert';
import { showAlert } from '../../slices/alertSlice';
import DeletePopover from '../../components/common/DeletePopover';
import { showPopup } from '../../slices/popoverSlice';


const TimeSheetMainScreen = () => {

  const dispatch = useDispatch();
  const { timeSheetList } = useSelector((state) => state.timeSheet);
  const { alert } = useSelector((state) => state.alert);
  console.log("Time sheet List:", timeSheetList);
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

  const handleDeleteClick = (event, row) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget); // Capture the button element as anchorEl
    dispatch(showPopup(row));
  }

  const handlePopoverClose = (event, reason) => {
    setAnchorEl(null); // Reset the anchorEl to close the popover 
  };

  const handleDelete = (id) => {
    console.log("Delete data", id);
    dispatch(deleteTimeSheet(id));
    const alert = {
      open: true,
      message: "Time entry deleted successfully",
      severity: "success",
    }
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
      minWidth: 150,
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
          <p>N/A</p>
        );
      },
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'contactPerson',
      headerName: 'Contact Person',
      renderHeader: () => (
        <strong>Contact Person</strong>
      ),
      renderCell: (params) => {
        const contactPerson = params.row.contactPerson;
        return contactPerson ? (
          <div>
            <p>{contactPerson.contactName}</p>
          </div>
        ) : (
          <p>No contact info</p>
        );
      },
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'user',
      headerName: 'User',
      renderHeader: () => (
        <strong>User</strong>
      ),
      renderCell: (params) => {
        const user = params.row.user;
        return user ? (
          <div>
            <p>{user.contactName}</p>
          </div>
        ) : (
          <p>No user info</p>
        );
      },
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'task',
      headerName: 'Task',
      renderHeader: () => (
        <strong>Task</strong>
      ),
      renderCell: (params) => {
        const task = params.row.task;
        return task ? (
          <div>
            <p>{task.taskName}</p>
          </div>
        ) : (
          <p>No task info</p>
        );
      },
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'taskDate',
      headerName: 'Task Date',
      renderHeader: () => (
        <strong>Task Date</strong>
      ),
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'status',
      headerName: 'Status',
      renderHeader: () => (
        <strong>Status</strong>
      ),
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'startTime',
      headerName: 'Start Time',
      renderHeader: () => (
        <strong>Start Time</strong>
      ),
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'endTime',
      headerName: 'End Time',
      renderHeader: () => (
        <strong>End Time</strong>
      ),
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'approvedHours',
      headerName: 'Approved Hours',
      renderHeader: () => (
        <strong>Approved Hours</strong>
      ),
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'remainingHours',
      headerName: 'Remaining Hours',
      renderHeader: () => (
        <strong>Remaining Hours</strong>
      ),
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'totalTime',
      headerName: 'Total Time',
      renderHeader: () => (
        <strong>Total Time</strong>
      ),
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'totalWorkingTime',
      headerName: 'Total Working Time',
      renderHeader: () => (
        <strong>Total Working Time</strong>
      ),
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'description',
      headerName: 'Description',
      renderHeader: () => (
        <strong>Description</strong>
      ),
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'internalNotes',
      headerName: 'Internal Notes',
      renderHeader: () => (
        <strong>Internal Notes</strong>
      ),
      flex: 1,
      minWidth: 150,
    },
  ];

  const rows = timeSheetList;

  const generateColumnsFromData = (data) => {
    if (!data || data.length === 0) {
      return [];
    }

    const keys = Object.keys(data[0]).filter(key => key !== 'id');
    return keys.map(key => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize header names
      renderHeader: () => <strong>{key.charAt(0).toUpperCase() + key.slice(1)}</strong>,
      editable: false,
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {

        if (params.row.userType === userTypeObj.CUSTOMER && key === "customer") {
          const customer = params.row[key];
          return customer ? (
            <div>
              <p>{customer.customerName}</p>
              <p>{customer.projectType}</p>
            </div>
          ) : (
            <p>N/A</p>
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
        <Box display="flex" justifyContent="center" alignItems="center" mb={2} width="100%">
          <MyAlert />
        </Box>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Time Sheet</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setDrawerOpen(true);
                }}
                disableRipple
              >
                Create Time Sheet
              </Button>
            </Box>
            <Box width="100%" height="100%">
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
            </Box>

          </CardContent>
        </Card>

        <EditContainer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <TimeForm onClose={() => setDrawerOpen(false)} handleOpenDialog={handleOpenDialog} />
        </EditContainer>


      </Box>
    </div>
  );
};

export default TimeSheetMainScreen; 
