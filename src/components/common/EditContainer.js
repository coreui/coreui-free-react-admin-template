import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const EditContainer = ({ open, onClose, children }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
            <Drawer 
              anchor="right" 
              open={open} 
              onClose={() => {}} 
              PaperProps={{
                 sx: {
                     marginTop: '65px', 
                     width: isSmallScreen ? '100%' : '60%',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        display: 'none', 
                    } 
                 }}}
            >
                <Box
                    sx={{ paddingY: 1 }}
                    role="presentation"
                    // onClick={onClose}
                    // onKeyDown={onClose}
                >
                    {children}
                </Box>
            </Drawer>
        
    );
};

export default EditContainer;