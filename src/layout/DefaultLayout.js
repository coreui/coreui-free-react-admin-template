import React from 'react'
import { AppContent, AppFooter, AppHeader } from '../components/index'
import ModalCreateTicket from '../components/Modal/ModalCreateTicket'
import ModalEditConfigJira from '../components/Modal/ModalEditConfigJira'

const DefaultLayout = () => {

  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
          <ModalCreateTicket />
          <ModalEditConfigJira />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
