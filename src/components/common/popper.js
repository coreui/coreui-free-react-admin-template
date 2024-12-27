import React from "react";
import { Popper, Paper, Grow, useTheme } from "@mui/material";    

const PopperComponent = ({children, open, anchorEl}) => {
    const theme = useTheme();
    const isSmallScreen = theme.breakpoints.down('md');

    return (
        <Popper
          sx={{ zIndex: 1200, height: 'auto','&::-webkit-scrollbar': { display: 'none'}}}   
          open={open}
          anchorEl={anchorEl}
          placement={"left-start"}
          transition
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: 'center top', }}>
              <Paper elevation={4} sx={{ width: 450, height:'auto', overflowX: 'hidden', overflowY: 'scroll', }} >
                {children}  
              </Paper>
            </Grow>
          )}
        </Popper>
    );
};

export default PopperComponent;