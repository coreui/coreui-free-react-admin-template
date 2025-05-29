import React, { useState } from 'react'
import { CContainer, CRow, CCol } from '@coreui/react'
import { AppHeader, AppFooter } from '../index'
import SellStockTable from './SellStockTable'
import SellCompanyChart from './SellCompanyChart'

const SellStock = () => {
  const [selectedCompany, setSelectedCompany] = useState(null)

  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div className="body flex-grow-1 px-3">
        <CContainer fluid>
          <CRow>
            <CCol sm={12} lg={12}>
              <SellStockTable
                onCompanySelect={setSelectedCompany}
                selectedCompany={selectedCompany}
              />
            </CCol>
          </CRow>

          {selectedCompany && (
            <CRow className="mt-4">
              <CCol sm={12}>
                <SellCompanyChart symbol={selectedCompany} />
              </CCol>
            </CRow>
          )}
        </CContainer>
      </div>
      <AppFooter />
    </div>
  )
}

export default SellStock
