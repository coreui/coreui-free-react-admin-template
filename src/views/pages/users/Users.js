import React, { useState, useEffect } from 'react'
import {
  CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody,
  CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CSpinner, CAlert, CPagination, CPaginationItem
} from '@coreui/react'
import { cilPeople } from '@coreui/icons'
import { cibCcMastercard } from '@coreui/icons'
import googleSheets from '../../dashboard/googleSheets'
import avatar1 from 'src/assets/images/avatars/1.jpg'

const PAGE_SIZE = 20
const Users = () => {
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setIsLoading(true)
        const spreadsheetId = '1c0-6pkvhvFntApsvgjCrLJrs0oU9e-L1wjfpsG80Ftk'
        const activeCustomers = await googleSheets.getSheetData(spreadsheetId, 'Current Active Customers')
        const newCustomers = await googleSheets.getSheetData(spreadsheetId, 'New Customers')
        const activeCustomersWithPage = activeCustomers.map(row => ({ ...row, PageName: 'Current Active Customers' }))
        const newCustomersWithPage = newCustomers.map(row => ({ ...row, PageName: 'New Customers' }))
        const formattedData = [...activeCustomersWithPage, ...newCustomersWithPage]
          .filter(row => row && row['اسم العميل'])
          .map(row => ({
            CustomerID: row['CustomerID'] || '',
            CustomerName: row['اسم العميل'] || '',
            ManagerName: row['اسم المسؤول'] || '',
            Mobile: row['رقم الموبايل'] || '',
            Area: row['منطقة العميل'] || '',
            BusinessType: row['نوع النشاط'] || '',
            PageName: row['PageName'] || ''
          }))
        setTableData(formattedData)
        if (formattedData.length === 0) {
          setError('No mapped data. Check field names. Raw data: ' + JSON.stringify([...activeCustomers, ...newCustomers].slice(0, 3)))
        }
      } catch (error) {
        setError('Error fetching customer data')
        setTableData([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchCustomerData()
  }, [])

  const totalPages = Math.ceil(tableData.length / PAGE_SIZE)
  const pagedData = tableData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const getPaginationItems = (currentPage, totalPages) => {
    const items = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i)
      }
    } else {
      items.push(1)
      if (currentPage > 4) {
        items.push('ellipsis-prev')
      }
      let start = Math.max(2, currentPage - 2)
      let end = Math.min(totalPages - 1, currentPage + 2)
      for (let i = start; i <= end; i++) {
        items.push(i)
      }
      if (currentPage < totalPages - 3) {
        items.push('ellipsis-next')
      }
      items.push(totalPages)
    }
    return items
  }

return (
    <CRow>
        <CCol xs>
            <CCard className="mb-4">
                <CCardHeader>Customer Information</CCardHeader>
                <CCardBody>
                    {isLoading && <CSpinner className="my-4" />}
                    {error && <CAlert color="danger">{error}</CAlert>}
                    {!isLoading && !error && pagedData.length > 0 && (
                        <>
                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead className="text-nowrap">
                                    <CTableRow>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">CustomerID</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">اسم العميل</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">اسم المسؤول</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">رقم الموبايل</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">منطقة العميل</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">نوع النشاط</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Page Name</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {pagedData.map((item, index) => (
                                        <CTableRow key={index}>
                                            <CTableDataCell className="text-center">{item.CustomerID}</CTableDataCell>
                                            <CTableDataCell className="text-center">{item.CustomerName}</CTableDataCell>
                                            <CTableDataCell className="text-center">{item.ManagerName}</CTableDataCell>
                                            <CTableDataCell className="text-center">{item.Mobile}</CTableDataCell>
                                            <CTableDataCell className="text-center">{item.Area}</CTableDataCell>
                                            <CTableDataCell className="text-center">{item.BusinessType}</CTableDataCell>
                                            <CTableDataCell className="text-center">{item.PageName}</CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                            <div className="d-flex align-items-center justify-content-between mt-3">
                                <CPagination aria-label="Page navigation example">
                                    <CPaginationItem disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>&lt;</CPaginationItem>
                                    {getPaginationItems(currentPage, totalPages).map((item, idx) => {
                                        if (item === 'ellipsis-prev' || item === 'ellipsis-next') {
                                            return <CPaginationItem key={item + idx} disabled>...</CPaginationItem>
                                        }
                                        return (
                                            <CPaginationItem
                                                key={item}
                                                active={currentPage === item}
                                                onClick={() => setCurrentPage(item)}
                                            >
                                                {item}
                                            </CPaginationItem>
                                        )
                                    })}
                                    <CPaginationItem disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>&gt;</CPaginationItem>
                                </CPagination>
                            </div>
                        </>
                    )}
                    {!isLoading && !error && tableData.length === 0 && (
                        <div className="text-center text-body-secondary my-4">No customer data found.</div>
                    )}
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
)
}

export default Users
