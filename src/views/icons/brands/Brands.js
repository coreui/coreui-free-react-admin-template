import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { brandSet } from '@coreui/icons'

const toKebabCase = (str) => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

export const getIconsView = iconset => {
  return Object.entries(iconset).map(([name, value]) => (
    <CCol className="mb-5" xs="6" sm="4" md="3" xl="2" key={name}>
      <CIcon content={value} size="2xl"/>
      <div>{toKebabCase(name)}</div>
    </CCol>
  ))
}

const CoreUIIcons = () => {
  return (
    <CCard>
      <CCardHeader>
        Brand Icons / as CIcon{' '}
        <div className="card-header-actions">
          <a href="https://github.com/coreui/coreui-icons" rel="noreferrer noopener" target="_blank" className="card-header-action">
            <small className="text-muted">Github</small>
          </a>
        </div>
      </CCardHeader>
      <CCardBody>
        <CRow className="text-center">
          {getIconsView(brandSet)}
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default CoreUIIcons
