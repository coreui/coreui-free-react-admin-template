import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1 flex-column px-3" style={{ color: 'white' }}>
          <AppContent />
        </div>
      </div>
      <div className="wrapper d-flex flex-column">
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
