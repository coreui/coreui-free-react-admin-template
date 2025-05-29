import React, { useState, useEffect } from 'react'
import '../css/style.css'
import {
  CCardHeader,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardFooter,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

const ExpensesTable = (props) => {
  const [expenses, setExpenses] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const setExpensesTableData = () => {
      let output = []
      let data = props.data
      let subCategoryKeys = []
      let expensesKeys = []
      let keys = Object.keys(data)
      let total = 0

      if (!props.selectedSubcategory) {
        keys.map((key, index) => {
          subCategoryKeys = Object.keys(data[key])
          subCategoryKeys.map((k) => {
            expensesKeys = Object.keys(data[key][k])
            expensesKeys.map((kk) => {
              output.push(data[key][k][kk])
            })
          })
        })
      } else {
        subCategoryKeys = Object.keys(data)
        subCategoryKeys.map((k) => {
          expensesKeys = Object.keys(data[k])
          expensesKeys.map((kk) => {
            output.push(data[k][kk])
          })
        })
      }

      // Sort the output array based on the amount value
      output.sort((a, b) => b.amount - a.amount)

      //get the total
      output.map((value) => {
        total += value.amount
      })
      setTotal(total.toFixed(2))

      return output
    }

    setExpenses(setExpensesTableData())
  }, [props.data, props.selectedSubcategory])

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>{props.month} Expenses details</CCardHeader>
          <CCardBody className="expensesTable overflow-auto">
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>
                    <AttachMoneyIcon />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Title</CTableHeaderCell>
                  <CTableHeaderCell>Category</CTableHeaderCell>
                  <CTableHeaderCell>Sub-Category</CTableHeaderCell>
                  <CTableHeaderCell>Credit Card</CTableHeaderCell>
                  <CTableHeaderCell>Date</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {expenses.map((value, index) => (
                  <CTableRow key={value.id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{value.amount}</CTableDataCell>
                    <CTableDataCell>
                      <div>{value.name}</div>
                    </CTableDataCell>
                    <CTableDataCell>{value.categoryName}</CTableDataCell>
                    <CTableDataCell>{value.subcategoryName}</CTableDataCell>
                    <CTableDataCell>{value.type}</CTableDataCell>
                    <CTableDataCell>{value.date}</CTableDataCell>
                  </CTableRow>
                ))}
                <CTableRow>
                  <CTableDataCell>
                    <strong>Total</strong>
                  </CTableDataCell>
                  <CTableDataCell colSpan={6}>
                    <strong>{total}</strong>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
          <CCardFooter>{/* Footer content */}</CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ExpensesTable
