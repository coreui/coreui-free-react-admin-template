import React from 'react';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DialogBox = ({open, handleCloseDialog}) => {
    

    return (
        <Dialog
            open={open}
            onClose={handleCloseDialog}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            PaperProps={{
                style: {
                    margin: 'auto',
                    maxWidth: '80%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                },
            }}
        >
            <DialogTitle id="dialog-title">lorem</DialogTitle>
            <DialogContent>
                <DialogContentText id="dialog-description">
                    lorem ipsum dolor sit amet
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogBox;