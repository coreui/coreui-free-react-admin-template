/* eslint-disable */
import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <>
      <CFooter>
        <div>
          <a href="https:/projects.sbs" target="_blank" rel="noopener noreferrer">
            Viou
          </a>
          <span className="ms-1">&copy; { new Date().getFullYear()} viou digital</span>
        </div>
        {/* <div className="ms-auto">
          <span className="me-1">Powered by</span>
          <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
            CoreUI for React
          </a>
        </div> */}
      </CFooter>
    </>
  )
}

export default React.memo(AppFooter)
