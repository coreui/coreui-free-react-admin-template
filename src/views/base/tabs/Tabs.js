import React, { useState } from 'react'
import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react-ts'
import { DocsLink } from 'src/reusable'

const Tabs = () => {
  const [activeKey, setActiveKey] = useState(1)
  const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'

  return (
    <CRow>
      <CCol xs="12" md="6" className="mb-4">
        <CCard className="mb-4">
          <CCardHeader>
            Index indentifiers
            <DocsLink name="CTabs" />
          </CCardHeader>
          <CCardBody>
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
                  Home
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
                  Profile
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeKey === 3} onClick={() => setActiveKey(3)}>
                  Messages
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane visible={activeKey === 1}>{`1. ${lorem}`}</CTabPane>
              <CTabPane visible={activeKey === 2}>{`2. ${lorem}`}</CTabPane>
              <CTabPane visible={activeKey === 3}>{`3. ${lorem}`}</CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
      {/* <CCol xs="12" md="6" className="mb-4">
        <CCard className="mb-4">
          <CCardHeader>Id indentifiers</CCardHeader>
          <CCardBody>
            <CTabs activeTab="home">
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink data-tab="home">Home</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="profile">Profile</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="messages">Messages</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane data-tab="home">{`1. ${lorem}`}</CTabPane>
                <CTabPane data-tab="profile">{`2. ${lorem}`}</CTabPane>
                <CTabPane data-tab="messages">{`3. ${lorem}`}</CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs="12" md="6" className="mb-4">
        <CCard className="mb-4">
          <CCardHeader>No fade animation tabs</CCardHeader>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-calculator" />
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-basket" />
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-chart-pie" />
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent fade={false}>
                <CTabPane>{`1. ${lorem}`}</CTabPane>
                <CTabPane>{`2. ${lorem}`}</CTabPane>
                <CTabPane>{`3. ${lorem}`}</CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs="12" md="6" className="mb-4">
        <CCard className="mb-4">
          <CCardHeader>Controlled tabs</CCardHeader>
          <CCardBody>
            <CTabs
              activeTab={active}
              onActiveTabChange={(idx) => setActive(idx)}
            >
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-calculator" />
                    {active === 0 && " Home"}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-basket" />
                    {active === 1 && " Profile"}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-chart-pie" />
                    {active === 2 && " Messages"}
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>{`1. ${lorem}`}</CTabPane>
                <CTabPane>{`2. ${lorem}`}</CTabPane>
                <CTabPane>{`3. ${lorem}`}</CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol> */}
    </CRow>
  )
}

export default Tabs
