import { AlignHorizontalLeft } from '@mui/icons-material';
import { darkScrollbar, formControlClasses } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import zIndex from '@mui/material/styles/zIndex';
import { makeStyles } from '@mui/styles';

 const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
            fontSize: '2rem',
        },
        h2: {
            fontSize: '1.5rem',
        },
    },
    spacing: 8,
    formControl: {
        formHeaderOuterContainer: {
            backgroundColor: 'background.paper',
            position: 'sticky', 
            top: 0,
            zIndex: 1000,
            paddingY: 2,
        },
        formHeaderContainer: {
            paddingY: 1,
            paddingX: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            // position: 'sticky',
            // top: 0,
            // zIndex: 10,
            backgroundColor: 'background.paper',  
        },
        formHeaderButtonContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: '0.35em',    
        },
        formComponent: {
            padding: 2,
            marginTop: 1,
        },
       


    } 
});
export const themeStyles = makeStyles ({
    stickyRightColumn: {
      position: 'sticky',
      right: 0,
      backgroundColor: '#fff', // Ensure a solid background
      zIndex: 100, // Ensure it stays on top
    },
  });

 export default theme;