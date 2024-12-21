import React, { useEffect, useState } from 'react';
import { Box, Popover, Typography, Button, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { Cancel, Done } from '@mui/icons-material';


const DeletePopover = (props) => {
    const { show,data } = useSelector((state) => state.delete);
    console.log('DeletePopover', data);
    
    const { anchorEl, handleClose, handleDelete } = props;


    return (
        <>
            {anchorEl && (
                <Popover
                    open={show}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    sx={{
                        '& .MuiPaper-root': {
                            boxShadow: 'none',
                            padding: '0',
                            backgroundColor: '#e0e0e0',
                        }
                    }}
                >
                    <Box 
                      sx={{
                         padding: 1,
                         display: 'flex',
                         flexDirection: 'column',
                         justifyContent: 'center',
                         alignItems: 'center',
                         gap: 1 
                      }}
                    >
                        <Typography variant="body1">
                            Are you sure you want to delete?
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <Button
                                variant="contained"
                                // color="primary"
                                onClick={() => handleDelete(data.id)}
                                sx={{
                                    cursor: 'pointer',
                                    backgroundColor: 'green',
                                    color: 'white', 
                                }}
                                startIcon={<Done />}    
                            >
                                Yes
                            </Button>
                            <Button 
                              variant="contained" 
                              color="#9e9e9e" 
                              onClick={handleClose} 
                              sx={{ cursor: 'pointer', background: '9e9e9e'}}
                              startIcon={<Cancel />}
                            >
                                No 
                            </Button>
                        </Box>
                    </Box>
                </Popover>
            )}
        </>
    );
};

export default DeletePopover;
