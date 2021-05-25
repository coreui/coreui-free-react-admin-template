import React from 'react'
import { CCard, CCardBody, CCardHeader, CRow } from '@coreui/react'
import { getIconsView } from '../brands/Brands.js'
import { flagSet } from '@coreui/icons'


const CoreUIIcons = () => {
  return (
    <CCard>
      <CCardHeader>
        Flag Icons
        
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
