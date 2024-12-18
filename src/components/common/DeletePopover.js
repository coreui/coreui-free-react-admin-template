import React, { useEffect, useState } from 'react';
import { Box, Popover, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';


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
                         padding: 2,
                         display: 'flex',
                         flexDirection: 'row',
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
                            <Typography
                                variant="body1"
                                color="primary"
                                onClick={() => handleDelete(data.id)}
                                sx={{
                                    cursor: 'pointer'
                                }}
                            >
                               yes
                            </Typography>
                            <Typography variant="body1" color="#9e9e9e" onClick={handleClose} sx={{ cursor: 'pointer'}}>
                                no
                            </Typography>
                        </Box>
                    </Box>
                </Popover>
            )}
        </>
    );
};

export default DeletePopover;
