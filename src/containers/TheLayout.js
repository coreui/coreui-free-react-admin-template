import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {

  return (
    <div>
      <TheSidebar/>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <TheHeader/>
        <div className="body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
