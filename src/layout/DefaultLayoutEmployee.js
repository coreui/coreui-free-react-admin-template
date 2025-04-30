import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useLocation } from 'react-router-dom'
import ModalCreateTicket from '../components/Modal/ModalCreateTicket'

const DefaultLayout = () => {
  const location = useLocation()

  return (
    <div>
      {location.pathname === '/' && <AppSidebar />}
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
          <ModalCreateTicket />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
