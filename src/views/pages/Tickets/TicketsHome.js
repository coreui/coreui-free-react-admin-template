import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { getAllTicketAPI } from '../../../actions/ticketActions'
const Tickets = () => {
  const dispatch = useDispatch()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(getAllTicketAPI())
      isFirstRender.current = false
    }
  }, [dispatch])

  return (
    <>
      <h1>Tickets</h1>
    </>
  )
}

export default Tickets
