import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  CBadge,
  CButton,
  CCol,
  CContainer,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import { getAllTicketAPI, toggleCreateTicketModalOpen } from '../../../actions/ticketActions'

const Tickets = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isFirstRender = useRef(true)
  const { ticketList, loading } = useSelector((state) => state.ticket)

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(getAllTicketAPI())
      isFirstRender.current = false
    }
  }, [dispatch])

  const handleClickAjouterTicket = (event) => {
    event.preventDefault()
    dispatch(toggleCreateTicketModalOpen())
  }

  const handleRowClick = (ticket) => {
    console.log('Ticket cliqué :', ticket)
    // Rediriger vers la vue détaillée du ticket
    navigate(`/ticket/${ticket.key}`)
  }

  if (loading) {
    return (
      <div className="pt-3 text-center">
        <CSpinner size="3rem" />
      </div>
    )
  }
  return (
    <CContainer>
      <CRow>
        <CCol sm={10}>
          <h2>All Ticket View</h2>
          {/* <p className="text-medium-emphasis">Current Jira API configuration settings</p> */}
        </CCol>
        <CCol sm={2} className="text-end">
          <CButton
            color="success"
            className="mb-2"
            onClick={(event) => handleClickAjouterTicket(event)}
          >
            Ajouter Ticket
          </CButton>
        </CCol>
      </CRow>
      <CTable borderless hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>From</CTableHeaderCell>
            <CTableHeaderCell>Key</CTableHeaderCell>
            <CTableHeaderCell>Summary</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {ticketList.map((item, index) => (
            <CTableRow
              key={index}
              onClick={() => handleRowClick(item)}
              style={{ cursor: 'pointer' }}
            >
              <CTableDataCell>
                <CBadge color={item.configId ? 'primary' : 'secondary'} shape="rounded-pill">
                  {item.configId ? 'externe' : 'interne'}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell>{item.key}</CTableDataCell>
              <CTableDataCell>{item.fields.summary}</CTableDataCell>
              <CTableDataCell>{item.fields.status.name}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CContainer>
  )
}

export default Tickets
