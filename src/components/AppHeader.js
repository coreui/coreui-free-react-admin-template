import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderDivider,
  CHeaderNav,
  CNavLink,
  CNavItem,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import Inv from '../components/inv/inv'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        {/* <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler> */}
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboards
            </CNavLink>
          </CNavItem>

          <CNavItem>
            <CNavLink to="/money" component={NavLink}>
              Credit Card
            </CNavLink>
          </CNavItem>

          <CNavItem>
            <CNavLink to="/categories" component={NavLink}>
              Categories
            </CNavLink>
          </CNavItem>

          <CNavItem>
            <CNavLink to="/inv" component={NavLink}>
              Invesment
            </CNavLink>
          </CNavItem>

          <CDropdown component="li" variant="nav-item">
            <CDropdownToggle>Expenses</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem className="d-none d-md-flex me-auto">
                <CNavLink to="/add_credit_card_expense" active={false} component={NavLink}>
                  Add Credit Card expense
                </CNavLink>
              </CDropdownItem>
              <CDropdownItem className="d-none d-md-flex me-auto">
                <CNavLink to="/add_loan_payment" active={false} component={NavLink}>
                  Add credit card payment
                </CNavLink>
              </CDropdownItem>
              <CDropdownDivider />
            </CDropdownMenu>
          </CDropdown>

          <CDropdown component="li" variant="nav-item">
            <CDropdownToggle>Loans</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem className="d-none d-md-flex me-auto">
                <CNavLink to="/loans" active={false} component={NavLink}>
                  Loans Dashboard
                </CNavLink>
              </CDropdownItem>
              <CDropdownItem className="d-none d-md-flex me-auto">
                <CNavLink to="/add_loan" active={false} component={NavLink}>
                  Add new loan
                </CNavLink>
              </CDropdownItem>
              <CDropdownItem className="d-none d-md-flex me-auto">
                <CNavLink to="/add_loan_payment" active={false} component={NavLink}>
                  Add loan payment
                </CNavLink>
              </CDropdownItem>
              <CDropdownDivider />
            </CDropdownMenu>
          </CDropdown>

          <CDropdown component="li" variant="nav-item">
            <CDropdownToggle>Invesments</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem className="d-none d-md-flex me-auto">
                <CNavLink to="/add_gold" active={false} component={NavLink}>
                  Add gold
                </CNavLink>
              </CDropdownItem>
              <CDropdownItem className="d-none d-md-flex me-auto">
                <CNavLink to="/add_haj" active={false} component={NavLink}>
                  Add Haj
                </CNavLink>
              </CDropdownItem>
              <CDropdownItem className="d-none d-md-flex me-auto">
                <CNavLink to="/add_investment" active={false} component={NavLink}>
                  Add Invesment
                </CNavLink>
              </CDropdownItem>
              <CDropdownDivider />
            </CDropdownMenu>
          </CDropdown>

          <CDropdown component="li" variant="nav-item">
            <CDropdownToggle>Stock</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem className="d-none d-md-flex me-auto">
                <CNavLink to="/stock" active={false} component={NavLink}>
                  Buy stock
                </CNavLink>
              </CDropdownItem>
              <CDropdownItem className="d-none d-md-flex me-auto">
                <CNavLink to="/stock/sell" active={false} component={NavLink}>
                  Sell stock
                </CNavLink>
              </CDropdownItem>
              <CDropdownItem className="d-none d-md-flex me-auto">
                <CNavLink to="/stock/AddLiquidityForm" active={false} component={NavLink}>
                  Add Liquidity
                </CNavLink>
              </CDropdownItem>
              <CDropdownItem className="d-none d-md-flex me-auto">
                <CNavLink to="/stock/stock-summary" active={false} component={NavLink}>
                  Performance Summary
                </CNavLink>
              </CDropdownItem>
              <CDropdownDivider />
            </CDropdownMenu>
          </CDropdown>

          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
