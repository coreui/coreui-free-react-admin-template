import React from 'react'
import { CCard, CCardBody, CCardHeader, CRow } from '@coreui/react'
import { freeSet } from '@coreui/icons'
import { getIconsView } from '../brands/Brands.js'
import { DocsLink } from 'src/reusable'

const CoreUIIcons = () => {
  return (
    <CCard className="mb-4">
      <CCardHeader>
        Free Icons / as CIcon{' '}
        <DocsLink href="https://github.com/coreui/coreui-icons" text="GitHub" />
      </CCardHeader>
      <CCardBody>
        <CRow className="text-center">{getIconsView(freeSet)}</CRow>
      </CCardBody>
    </CCard>
  )
}

export default CoreUIIcons
