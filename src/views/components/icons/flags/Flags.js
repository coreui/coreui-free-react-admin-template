import React from 'react'
import { CCard, CCardBody, CCardHeader, CRow } from '@coreui/react'
import { getIconsView } from '../brands/Brands.js'
import { flagSet } from '@coreui/icons'
import { DocsLink } from 'src/reusable'

const CoreUIIcons = () => {
  return (
    <CCard className="mb-4">
      <CCardHeader>
        Flag Icons
        <DocsLink href="https://github.com/coreui/coreui-icons" text="GitHub" />
      </CCardHeader>
      <CCardBody>
        <CRow className="text-center">{getIconsView(flagSet)}</CRow>
      </CCardBody>
    </CCard>
  )
}

export default CoreUIIcons
