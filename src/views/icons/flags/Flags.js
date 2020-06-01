import React from 'react'
import { CCard, CCardBody, CCardHeader, CRow } from '@coreui/react'
import { getIconsView } from '../brands/Brands.js'
import { flagSet } from '@coreui/icons'

const CoreUIIcons = () => {
  return (
    <CCard>
      <CCardHeader>
        Flag Icons / as CIcon{' '}
        <div className="card-header-actions">
          <a href="https://github.com/coreui/coreui-icons" rel="noreferrer noopener" target="_blank" className="card-header-action">
            <small className="text-muted">Github</small>
          </a>
        </div>
      </CCardHeader>
      <CCardBody>
        <CRow className="text-center">
          {getIconsView(flagSet)}
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default CoreUIIcons
