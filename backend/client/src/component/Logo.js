import React from 'react';
import logo from '../images/logo_row.png';
import { makeStyles } from '@material-ui/styles';
import { positions } from '@material-ui/system';

const useStyles = makeStyles({
    logo: {
        height:70,
        width:193,
        paddingTop:10

    },
  });

function Header() {
  // Import result is the URL of your image
  const classes = useStyles();
  return <img className={classes.logo} src={logo} alt="Logo" />;
}

export default Header;