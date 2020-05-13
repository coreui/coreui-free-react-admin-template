import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import { AppSidebar, AppSidebarNav } from "@coreui/react";
const DefaultSidebar = () => {
  return (
    <React.Fragment>
      <AppSidebar className="d-lg-none sidebar__custom">
        <AppSidebarNav>
          <Nav>
            <NavItem>
              <NavLink
                to="/"
                className="nav-link"
                activeClassName={"active__header"}
                exact
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="/dashboard"
                className="nav-link"
                activeClassName={"active__header"}
                exact
              >
                Raise Capital
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="/users"
                className="nav-link"
                activeClassName={"active__header"}
                exact
              >
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="/login"
                activeClassName={"active__header"}
                className="nav-link"
                exact
              >
                Login
              </NavLink>
            </NavItem>
          </Nav>
        </AppSidebarNav>
      </AppSidebar>
    </React.Fragment>
  );
};
export default DefaultSidebar;
