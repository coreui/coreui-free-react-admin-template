import React, { useState, useEffect } from 'react'
import axios from './axiosConfig'
import { AppContent, AppFooter, AppHeader } from './index'
import './css/style.css'
import { CContainer, CRow, CCol, CCard, CCardBody, CCardFooter } from '@coreui/react'
import TotalLaonsPayments from './widgets/totalLoansPayments'
import LoanMeter from './widgets/LoanMeter'
import TestApp from './widgets/LoansPaymentChart'
import LoanPaymentChart from './widgets/LoansPaymentChart'
import StackedColumnChart from './widgets/StackedColumnChart'

const Loans = () => {
  const url = process.env.REACT_APP_API_URL

  const [data, setData] = useState(false)
  const [unpaid, setUnpaid] = useState(false)
  const [totalLoans, setTotalLoans] = useState(false)

  useEffect(() => {
    axios.get(url + 'loans/loans').then((response) => {
      setTotalLoans(response.data)
      setUnpaid(response.data.unpaid)
    })
  }, [])
  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer fluid>
            <CCard className="mb-4">
              <CCardBody>
                <CRow>
                  <CCol lg={2}>
                    <TotalLaonsPayments amount={unpaid} />
                    <div id="LoanMeter">
                      <LoanMeter data={totalLoans} />
                    </div>
                  </CCol>
                  <CCol lg={5}>
                    <StackedColumnChart data={totalLoans} />
                  </CCol>
                  <CCol lg={5}>
                    {/* <SubCAtegoriesChart data={monthlySubCategoriesDetails} percentage={monthlyTotal / limit} selectedSubcategory={selectedSubcategory} /> */}
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardFooter>
                {/* <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
                  </CRow>

                  {/* <ExpensesTable month={month} year={year} data={monthlyExpenses} selectedSubcategory={selectedSubcategory} /> */}
                {/* <CRow>
                    <CCol sm={12}>
                      <h4 id="traffic" className="card-title mb-0">
                        {/* {month} Expenses 
                      </h4>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol lg={12}>
                      <MonthsChart data={monthlyChart} categories={categories} />
                    </CCol>
                  </CRow>

                  <CCPaymentsTable month={month} year={year} data={monthlyExpenses} selectedSubcategory={selectedSubcategory} /> */}
              </CCardFooter>
            </CCard>
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Loans
