import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllTicketAPI } from '../../../actions/ticketActions'
import { CCol, CContainer, CRow, CTable } from '@coreui/react'
import { elementType } from 'prop-types'
const columns = [
  {
    key: 'key',
    label: 'key',
    _props: { scope: 'col' },
  },
  {
    key: 'summary',
    label: 'summary',
    _props: { scope: 'col' },
  },
  // {
  //   key: 'Username',
  //   label: 'Username',
  //   _props: { scope: 'col' },
  // },
  // {
  //   key: 'Protocol',
  //   label: 'Protocol',
  //   _props: { scope: 'col' },
  // },
  // {
  //   key: 'API Version',
  //   label: 'API Version',
  //   _props: { scope: 'col' },
  // },
]
const Tickets = () => {
  const dispatch = useDispatch()
  const isFirstRender = useRef(true)
  const { ticketList } = useSelector((state) => state.ticket)
  const [ticketsItems, setTicketsItems] = useState([])

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(getAllTicketAPI())
      isFirstRender.current = false
    }
  }, [dispatch])

  useEffect(() => {
    if (ticketList) {
      const list = []
      console.log(ticketList)
      const tickets = ticketList.map((element) => element.tickets)
      tickets.map((element) => {
        element.map((el) => {
          console.log('el', el)
          list.push({
            key: el.key,
            summary: el.fields.summary,
          })
        })
      })
      setTicketsItems(list)
    }
  }, [ticketList])

  return (
    <CContainer>
      <h1>Tickets</h1>
      <CRow>
        <CCol>
          <CTable columns={columns} items={ticketsItems} striped bordered hover responsive />
        </CCol>
        <CCol>2 of 2</CCol>
      </CRow>
    </CContainer>
  )
}

export default Tickets
