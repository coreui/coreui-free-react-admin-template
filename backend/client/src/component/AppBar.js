import React from 'react';
import { Link } from 'react-router-dom';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Logo from './Logo';
import './AppBar.css'; 
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

const NavBar = () => {
  return (
    /* <div id = "AppBar_root" className='container-xl-fluid'>
      <AppBar id = "AppBar_Bar">
        <Toolbar >
            <div id = "AppBar_Logo"><Link  to="/"><Logo/></Link></div>
            <div id = "AppBar_space"></div>
            <div id = "AppBar_menu">
              <ul className = "AppBar_dropdown">
                
                  <li><Link id = "AppBar_Link" to="/About"><Button id = "AppBar_menuButton">About</Button></Link>
                    <ul>
                      <li><Link id = "AppBar_Link" to="/History"><Button id = "AppBar_menuButton">History</Button></Link></li>
                      <li><Link id = "AppBar_Link" to="/Team"><Button id = "AppBar_menuButton">Contributors</Button></Link></li>
                    </ul>
                  </li>
                <li><Link id = "AppBar_Link" to="/Contact"><Button id = "AppBar_menuButton">Contact</Button></Link></li>
                <li><Link id = "AppBar_Link" to="/Support"><Button id = "AppBar_menuButton">Support</Button></Link></li>
                <li><Link id = "AppBar_Link" to="/Login"><Button id = "AppBar_menuButton">Login</Button></Link></li>
              </ul>
            </div>
        </Toolbar>
      </AppBar>
    </div> */
    // =================================Bootstrap=============================
    // <nav className="navbar navbar-expand-lg bg-light fixed-top">
    //       <div><Link to="/Home" className="navbar-brand"><Logo /></Link></div>
    //       <button class="navbar-toggler bg-dark" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //         <span class="navbar-toggler-icon"></span>
    //       </button>
    //       <div class="collapse navbar-collapse " id="navbarSupportedContent">
    //       <ul class="navbar-nav mr-auto ">
    //       <li class="nav-item dropdown active">
    //           {/* <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //             Dropdown
    //           </a> */}
    //           <Link id = "AppBar_Link" className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" to="/About"><Button id = "AppBar_menuButton">About</Button></Link>

    //           <div class="dropdown-menu" aria-labelledby="AppBar_Link">
    //             <Link id = "AppBar_Link" className="dropdown-item" to="/History"><Button id = "AppBar_menuButton">History</Button></Link>
    //             <Link id = "AppBar_Link" className="dropdown-item" to="/Team"><Button id = "AppBar_menuButton">Contributors</Button></Link>

    //           </div>
    //         </li>
    //         <li class="nav-item ">
    //           <Link id = "AppBar_Link" className="nav-link" to="/Contact"><Button id = "AppBar_menuButton">Contact<span class="sr-only">(current)</span></Button></Link>
    //         </li>
    //         <li class="nav-item">
    //           <Link id = "AppBar_Link" className="nav-link" to="/Support"><Button id = "AppBar_menuButton">Support</Button></Link>
    //         </li>
    //         <li class="nav-item ml-auto">
    //           <Link id = "AppBar_Link" className="nav-link" to="/Login"><Button id = "AppBar_menuButton">Login</Button></Link>
    //         </li>
            
    //         {/* <li class="nav-item">
    //           <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
    //         </li> */}
    //       </ul>
    //     </div>
    // </nav>
    //=========================Bootstrap React =============================
    <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/"><Logo /></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav>
    <Button id = "AppBar_menuButton" className="noHoverBg">
      <NavDropdown title="ABOUT" id="basic-nav-dropdown">
        
          <NavDropdown.Item href="/About"><Button id = "AppBar_menuButton" className="noHoverBg">About</Button></NavDropdown.Item>
          <NavDropdown.Item href="/History"><Button id = "AppBar_menuButton" className="noHoverBg">History</Button></NavDropdown.Item>
          <NavDropdown.Item href="/Team"><Button id = "AppBar_menuButton" className="noHoverBg">Team</Button></NavDropdown.Item>
          {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
        </NavDropdown>
      </Button> 
      <Nav.Link href="/Contact"><Button id = "AppBar_menuButton" className="noHoverBg">Contact<span class="sr-only">(current)</span></Button></Nav.Link>
      <Nav.Link href="/Support"><Button id = "AppBar_menuButton" className="noHoverBg">Support</Button></Nav.Link>
      <Nav.Link href="/Login"><Button id = "AppBar_menuButton" className="noHoverBg">Login</Button></Nav.Link>
      
    </Nav>
  </Navbar.Collapse>
</Navbar>
  );
};
export { NavBar };
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import Logo from './Logo';

// const useStyles = makeStyles(theme => ({
//   root: {
//     //flexGrow: 1,
//     position:'fixed',
//     zIndex:1,
//     maxWidth:'100%'
//   },
//   menuButton: {
//     marginRight: theme.spacing(1),
//     height:'100%',
//     color:'#6AFFC6',
//     fontSize: 14,
//     fontWeight:'Bold',
//     '&:hover':{
//       color:'black',
//     },
//     '&$selected': {
//       color: '#1138FF',
//     },
//     '&:focus': {
//       color: '#3238FF',
//     },
//   },
//   bar:{
//     flexGrow: 1,
//     position:"static",
//     marginRight:theme.spacing(100),
//     backgroundColor:'#FFFFFF',
//     height:90
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// export default function ButtonAppBar() {
//   const classes = useStyles();
//   return (
//     <div className={classes.root}>
//       <AppBar className={classes.bar}>
//         <Toolbar>
//           <Typography className={classes.title}>
//             <Logo/>
//           </Typography>
//           <Button className={classes.menuButton} >ABOUT US</Button>
//           <Button className={classes.menuButton} >CONTACT US</Button>
//           <Button className={classes.menuButton} >SUPPORT US</Button>
//           <Button className={classes.menuButton} >LOGIN</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }