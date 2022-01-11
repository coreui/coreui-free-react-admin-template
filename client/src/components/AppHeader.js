import React from 'react'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectGlobal,
  sidebarOpen,
  sidebarHide,
  squeezeSidebar,
  stretchSidebar,
} from '../slices/globalSlice'
import { selectLogin } from '../slices/loginSlice'
import { selectSearch, setKeywords, setResultProfiles } from '../slices/searchSlice'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CImage,
  CButton,
  CFormControl,
  CInputGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppHeaderDropdown } from './header'

import logo_row from '../assets/images/logo_row.png'
import axios from 'axios'

const AppHeader = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { sidebarShow, unfoldable } = useSelector(selectGlobal)
  const { isLogin } = useSelector(selectLogin)
  const { keywords } = useSelector(selectSearch)

  const handleSearch = (e) => {
    e.preventDefault()
    axios
      .post('api/smartsearchProfile', { keyword: keywords })
      .then((res) => {
        dispatch(setResultProfiles(res.data))
        history.push('/search_profile')
      })
      .catch((err) => console.log(err))
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch(e)
    }
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ms-md-3 d-md-none"
          onClick={() => (sidebarShow ? dispatch(sidebarHide()) : dispatch(sidebarOpen()))}
        >
          <CIcon icon="cil-menu" name="cil-menu" size="lg" />
        </CHeaderToggler>
        <CHeaderToggler
          className="ms-md-3 d-none d-md-block"
          onClick={() => {
            sidebarShow ? dispatch(sidebarHide()) : dispatch(sidebarOpen())
            unfoldable ? dispatch(squeezeSidebar()) : dispatch(stretchSidebar())
          }}
        >
          <CIcon icon="cil-menu" name="cil-menu" size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="d-flex justify-content-center mx-auto d-md-none" to="/">
          <CImage src={logo_row} fluid width="50%" />
        </CHeaderBrand>

        <CHeaderNav className="d-none d-md-flex me-auto">
          {isLogin ? (
            <CNavItem>
              <CInputGroup>
                <CFormControl
                  type="search"
                  placeholder="Search for Profile"
                  onChange={(e) => {
                    dispatch(setKeywords(e.target.value))
                  }}
                  onKeyPress={handleEnter}
                ></CFormControl>
                <CButton onClick={handleSearch}>
                  <CIcon icon="cil-search" name="cil-search" />
                </CButton>
              </CInputGroup>
            </CNavItem>
          ) : (
            <></>
          )}
        </CHeaderNav>
        {isLogin ? (
          <CHeaderNav className="ms-3 d-none d-md-block">
            <AppHeaderDropdown />
          </CHeaderNav>
        ) : (
          <CHeaderNav className="d-none d-md-block">
            <CNavLink to="/login" component={NavLink}>
              <CButton>Login</CButton>
            </CNavLink>
          </CHeaderNav>
        )}
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
