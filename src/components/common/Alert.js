import React, { forwardRef } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../../slices/alertSlice';

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
    return <Alert elevation={6} ref={ref} {...props} />;
});



const MyAlert = ({  snackbar, onClose }) => {
    const {alert} = useSelector((state) => state.alert);
    const dispatch = useDispatch()

    const handleCloseSnackbar = () => {
        dispatch(hideAlert());
    };
    return (
        <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center'}}>
            <SnackbarAlert onClose={handleCloseSnackbar} severity={alert.severity}>
                {alert.message}
            </SnackbarAlert>
        </Snackbar>
    );
};

export default MyAlert;
