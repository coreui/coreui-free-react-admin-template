import React from 'react'
import { CCard, CCardBody, CCardHeader, CRow } from '@coreui/react'
import { freeSet } from '@coreui/icons'
import { getIconsView } from '../brands/Brands.js'

const CoreUIIcons = () => {
  return (
    <CCard>
      <CCardHeader>
        Free Icons / as CIcon{' '}
        <div className="card-header-actions">
          <a href="https://github.com/coreui/coreui-icons" rel="noreferrer noopener" target="_blank" className="card-header-action">
            <small className="text-muted">Github</small>
          </a>
        </div>
      </CCardHeader>
      <CCardBody>
        <CRow className="text-center">
          {getIconsView(freeSet)}
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default CoreUIIcons
