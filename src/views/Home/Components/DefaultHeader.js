import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
} from 'reactstrap';
import logo from '../assets/imgs/logo.png';
const DefaultHeader = () => {
  const [dropdownOpen, setDropDown] = React.useState(false);

  function toggle() {
    setDropDown(!dropdownOpen);
  }

  return (
    <React.Fragment>
      <AppSidebarToggler className="d-lg-none " display="md" mobile />
      <AppNavbarBrand
        className="mt-3 logo__height"
        full={{
          src: logo,
          width: 'auto',
          height: '100%',
          alt: 'Red Block Logo',
        }}
        minimized={{
          src: logo,
          width: 30,
          height: 30,
          alt: 'Red Block Logo',
        }}
      />
      <Nav className="d-md-down-none mr-5" navbar>
        <NavItem className="px-3">
          <NavLink
            to="/dashboard"
            className="nav-link"
            activeClassName={'active__header'}
            exact
          >
            Raise Capital
          </NavLink>
        </NavItem>
        <NavItem className="px-3">
          <NavLink
            to="/users"
            className="nav-link"
            activeClassName={'active__header'}
            exact
          >
            About
          </NavLink>
        </NavItem>
        <NavItem className="px-3">
          <NavLink
            to="/login"
            activeClassName={'active__header'}
            className="nav-link"
            exact
          >
            Login
          </NavLink>
        </NavItem>

        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle className="app__dropdown" caret>
            Languages
          </DropdownToggle>
          <DropdownMenu style={{ fontSize: '0.85rem' }}>
            <DropdownItem>English</DropdownItem>
            <DropdownItem>Urdu</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </Nav>
    </React.Fragment>
  );
};

export default DefaultHeader;
