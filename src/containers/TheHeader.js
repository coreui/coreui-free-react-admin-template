import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CToggler, CBreadcrumbRouter } from "@coreui/react";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CNavLink,
  CNavItem,
} from "@coreui/react-ts";
import CIcon from "@coreui/icons-react";

// routes config
import routes from "../routes";

import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks,
} from "./index";

const TheHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CToggler
          inHeader
          className="ms-md-3 d-lg-none"
          onClick={toggleSidebarMobile}
        />
        <CToggler
          inHeader
          className="ms-3 d-md-down-none"
          onClick={toggleSidebar}
        />
        <CHeaderBrand className="mx-auto d-lg-none" to="/">
          <CIcon name="logo" height="48" alt="Logo" />
        </CHeaderBrand>

        <CHeaderNav className="d-md-down-none me-auto">
          <CNavItem>
            <CNavLink
              to="/dashboard"
              component={NavLink}
              activeClassName="active"
            >
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/users" component={NavLink} activeClassName="active">
              Users
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav>
          <TheHeaderDropdownNotif />
          <TheHeaderDropdownTasks />
          <TheHeaderDropdownMssg />
          <TheHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        {/* <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon name="cil-speech" alt="Settings" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/users" component={NavLink} activeClassName="active">
              <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
            </CNavLink>
          </CNavItem>
        </CHeaderNav> */}
      </CContainer>
    </CHeader>
  );
};

export default TheHeader;
