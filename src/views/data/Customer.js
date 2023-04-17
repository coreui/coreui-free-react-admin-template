import {
  CButton,
  CCol,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { BACKEND_HOST } from '../../constant'

import CustomerCreateModel from '../modal/CustomerCreateModel'

const Customer = () => {
  const [customer, setCustomer] = useState([])
  const [limit, setLimit] = useState(20)
  const [offset, setOffset] = useState(0)

  const createUserModalRef = useRef()

  useEffect(() => {
    getCustomersData()
  }, [])

  const getCustomersData = () => {
    axios
      .get(`${BACKEND_HOST}/customer`, {
        params: {
          limit,
          offset,
        },
      })
      .then((res) => {
        const newCustomer = res.data.customers
        setCustomer(newCustomer)
      })
      .catch((err) => {
        console.log('Error while getting Customer', err)
      })
  }

  const openCreateUser = () => {
    createUserModalRef.current?.show()
  }
  console.log(customer)
  return (
    <CRow>
      <CCol>
        <CButton onClick={openCreateUser} className="px-4 mb-3">
          Create Customer
        </CButton>
      </CCol>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
            <CTableHeaderCell scope="col">Age</CTableHeaderCell>
            <CTableHeaderCell scope="col">Job</CTableHeaderCell>
            <CTableHeaderCell scope="col">Location</CTableHeaderCell>
            <CTableHeaderCell scope="col">GoodWill</CTableHeaderCell>
            <CTableHeaderCell scope="col">Intimacy</CTableHeaderCell>
            <CTableHeaderCell scope="col">MinBudget</CTableHeaderCell>
            <CTableHeaderCell scope="col">MaxBudget</CTableHeaderCell>
            <CTableHeaderCell scope="col">CaringArea</CTableHeaderCell>
            <CTableHeaderCell scope="col">CaringProduct</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {customer.map((item, index) => {
            return (
              <CTableRow key={index}>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell>{item.phone}</CTableDataCell>
                <CTableDataCell>{item.age}</CTableDataCell>
                <CTableDataCell>{item.job}</CTableDataCell>
                <CTableDataCell>{item.userArea}</CTableDataCell>
                <CTableDataCell>{item.goodwill}</CTableDataCell>
                <CTableDataCell>{item.intimacy}</CTableDataCell>
                <CTableDataCell>{item.minBudget}</CTableDataCell>
                <CTableDataCell>{item.maxBudget}</CTableDataCell>
                <CTableDataCell>{item.caringArea.toString()}</CTableDataCell>
                <CTableDataCell>{item.caringProduct.toString()}</CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <CPagination aria-label="Page navigation example">
        <CPaginationItem aria-label="Previous" disabled>
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        <CPaginationItem>1</CPaginationItem>
        <CPaginationItem aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
      <CustomerCreateModel ref={createUserModalRef} />
    </CRow>
  )
}

export default Customer
