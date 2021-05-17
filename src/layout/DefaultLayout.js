import React from 'react'
import { TheContent, AppSidebar, AppFooter, AppHeader } from '../containers/index'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <TheContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
