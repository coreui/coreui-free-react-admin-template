import React from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-ts'
import { DocsLink } from 'src/reusable'

const Tables = () => {
  return (
    <>
      <CRow>
        <CCol xs="12" lg="6">
          <CCard className="mb-4">
            <CCardHeader>
              Simple Table
              <DocsLink name="CModal"/>
            </CCardHeader>
            <CCardBody>
              <CTable responsive="sm">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Username</CTableHeaderCell>
                    <CTableHeaderCell>Date registered</CTableHeaderCell>
                    <CTableHeaderCell>Role</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>Samppa Nori</CTableDataCell>
                    <CTableDataCell>2012/01/01</CTableDataCell>
                    <CTableDataCell>Member</CTableDataCell>
                    <CTableDataCell><CBadge color="success">Active</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Estavan Lykos</CTableDataCell>
                    <CTableDataCell>2012/02/01</CTableDataCell>
                    <CTableDataCell>Staff</CTableDataCell>
                    <CTableDataCell><CBadge color="danger">Banned</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Chetan Mohamed</CTableDataCell>
                    <CTableDataCell>2012/02/01</CTableDataCell>
                    <CTableDataCell>Admin</CTableDataCell>
                    <CTableDataCell><CBadge color="secondary">Inactive</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Derick Maximinus</CTableDataCell>
                    <CTableDataCell>2012/03/01</CTableDataCell>
                    <CTableDataCell>Member</CTableDataCell>
                    <CTableDataCell><CBadge color="warning">Pending</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Friderik Dávid</CTableDataCell>
                    <CTableDataCell>2012/01/21</CTableDataCell>
                    <CTableDataCell>Staff</CTableDataCell>
                    <CTableDataCell><CBadge color="success">Active</CBadge></CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs="12" lg="6">
          <CCard className="mb-4">
            <CCardHeader>
              Striped Table
            </CCardHeader>
            <CCardBody>
              <CTable responsive="sm" striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Username</CTableHeaderCell>
                    <CTableHeaderCell>Date registered</CTableHeaderCell>
                    <CTableHeaderCell>Role</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>Yiorgos Avraamu</CTableDataCell>
                    <CTableDataCell>2012/01/01</CTableDataCell>
                    <CTableDataCell>Member</CTableDataCell>
                    <CTableDataCell><CBadge color="success">Active</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Avram Tarasios</CTableDataCell>
                    <CTableDataCell>2012/02/01</CTableDataCell>
                    <CTableDataCell>Staff</CTableDataCell>
                    <CTableDataCell><CBadge color="danger">Banned</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Quintin Ed</CTableDataCell>
                    <CTableDataCell>2012/02/01</CTableDataCell>
                    <CTableDataCell>Admin</CTableDataCell>
                    <CTableDataCell><CBadge color="secondary">Inactive</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Enéas Kwadwo</CTableDataCell>
                    <CTableDataCell>2012/03/01</CTableDataCell>
                    <CTableDataCell>Member</CTableDataCell>
                    <CTableDataCell><CBadge color="warning">Pending</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Agapetus Tadeáš</CTableDataCell>
                    <CTableDataCell>2012/01/21</CTableDataCell>
                    <CTableDataCell>Staff</CTableDataCell>
                    <CTableDataCell><CBadge color="success">Active</CBadge></CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>

        <CCol xs="12" lg="6">
          <CCard className="mb-4">
            <CCardHeader>
              Condensed Table
            </CCardHeader>
            <CCardBody>
              <CTable responsive="sm" small>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Username</CTableHeaderCell>
                    <CTableHeaderCell>Date registered</CTableHeaderCell>
                    <CTableHeaderCell>Role</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>Carwyn Fachtna</CTableDataCell>
                    <CTableDataCell>2012/01/01</CTableDataCell>
                    <CTableDataCell>Member</CTableDataCell>
                    <CTableDataCell><CBadge color="success">Active</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Nehemiah Tatius</CTableDataCell>
                    <CTableDataCell>2012/02/01</CTableDataCell>
                    <CTableDataCell>Staff</CTableDataCell>
                    <CTableDataCell><CBadge color="danger">Banned</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Ebbe Gemariah</CTableDataCell>
                    <CTableDataCell>2012/02/01</CTableDataCell>
                    <CTableDataCell>Admin</CTableDataCell>
                    <CTableDataCell><CBadge color="secondary">Inactive</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Eustorgios Amulius</CTableDataCell>
                    <CTableDataCell>2012/03/01</CTableDataCell>
                    <CTableDataCell>Member</CTableDataCell>
                    <CTableDataCell><CBadge color="warning">Pending</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Leopold Gáspár</CTableDataCell>
                    <CTableDataCell>2012/01/21</CTableDataCell>
                    <CTableDataCell>Staff</CTableDataCell>
                    <CTableDataCell><CBadge color="success">Active</CBadge></CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs="12" lg="6">
          <CCard className="mb-4">
            <CCardHeader>
              Bordered Table
            </CCardHeader>
            <CCardBody>
              <CTable responsive="sm" bordered>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Username</CTableHeaderCell>
                    <CTableHeaderCell>Date registered</CTableHeaderCell>
                    <CTableHeaderCell>Role</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>Pompeius René</CTableDataCell>
                    <CTableDataCell>2012/01/01</CTableDataCell>
                    <CTableDataCell>Member</CTableDataCell>
                    <CTableDataCell><CBadge color="success">Active</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Paĉjo Jadon</CTableDataCell>
                    <CTableDataCell>2012/02/01</CTableDataCell>
                    <CTableDataCell>Staff</CTableDataCell>
                    <CTableDataCell><CBadge color="danger">Banned</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Micheal Mercurius</CTableDataCell>
                    <CTableDataCell>2012/02/01</CTableDataCell>
                    <CTableDataCell>Admin</CTableDataCell>
                    <CTableDataCell><CBadge color="secondary">Inactive</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Ganesha Dubhghall</CTableDataCell>
                    <CTableDataCell>2012/03/01</CTableDataCell>
                    <CTableDataCell>Member</CTableDataCell>
                    <CTableDataCell><CBadge color="warning">Pending</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Hiroto Šimun</CTableDataCell>
                    <CTableDataCell>2012/01/21</CTableDataCell>
                    <CTableDataCell>Staff</CTableDataCell>
                    <CTableDataCell><CBadge color="success">Active</CBadge></CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

      </CRow>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              Combined All Table
            </CCardHeader>
            <CCardBody>
              <CTable responsive="sm" bordered striped small>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Username</CTableHeaderCell>
                    <CTableHeaderCell>Date registered</CTableHeaderCell>
                    <CTableHeaderCell>Role</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>Vishnu Serghei</CTableDataCell>
                    <CTableDataCell>2012/01/01</CTableDataCell>
                    <CTableDataCell>Member</CTableDataCell>
                    <CTableDataCell><CBadge color="success">Active</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Zbyněk Phoibos</CTableDataCell>
                    <CTableDataCell>2012/02/01</CTableDataCell>
                    <CTableDataCell>Staff</CTableDataCell>
                    <CTableDataCell><CBadge color="danger">Banned</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Einar Randall</CTableDataCell>
                    <CTableDataCell>2012/02/01</CTableDataCell>
                    <CTableDataCell>Admin</CTableDataCell>
                    <CTableDataCell><CBadge color="secondary">Inactive</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Félix Troels</CTableDataCell>
                    <CTableDataCell>2012/03/01</CTableDataCell>
                    <CTableDataCell>Member</CTableDataCell>
                    <CTableDataCell><CBadge color="warning">Pending</CBadge></CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Aulus Agmundr</CTableDataCell>
                    <CTableDataCell>2012/01/21</CTableDataCell>
                    <CTableDataCell>Staff</CTableDataCell>
                    <CTableDataCell><CBadge color="success">Active</CBadge></CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Tables
