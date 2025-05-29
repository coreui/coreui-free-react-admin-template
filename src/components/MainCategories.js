import React, { useState } from 'react'
import axios from 'axios'
import { AppContent, AppFooter, AppHeader } from './index'
import {
  CContainer,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
} from '@coreui/react'
import DynamicCollapseTable from './categories/DynamicCollapseTable'
import AddCategory from './categories/AddCategory'

const url = process.env.REACT_APP_API_URL

var data = []
const response = await axios.get(url + 'categories/categories_with_sub')
response.data.map((row) => data.push(row))
const MainCategories = () => {
  const showModal = () => {
    setVisible(!visible)
  }
  const closeModal = () => {
    setVisible(false)
  }

  const [visible, setVisible] = useState(false)

  const CollapsibleTable = ({ rows }) => {
    const [openRowId, setOpenRowId] = useState(null)

    const handleRowToggle = (rowId) => {
      if (openRowId === rowId) {
        setOpenRowId(null)
      } else {
        setOpenRowId(rowId)
      }
    }
  }
  return (
    <div>
      <>
        <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
          <CModalHeader>
            <CModalTitle>Add Subcategory</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <AddCategory ParentFunction={closeModal} data={data} />
          </CModalBody>
        </CModal>
      </>

      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer fluid>
            <CCard>
              <CCardHeader>Main Expenses Categories</CCardHeader>
              <CCardBody>
                <DynamicCollapseTable data={data}></DynamicCollapseTable>
                <CButton onClick={() => showModal()}>Add Main category</CButton>
              </CCardBody>
            </CCard>
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default MainCategories
