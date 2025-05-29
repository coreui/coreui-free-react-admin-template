import React, { useState, useEffect } from 'react'
import axios from '../axiosConfig'
import { AppFooter, AppHeader } from '../index'
import '../css/style.css'
import { CContainer, CRow, CCol } from '@coreui/react'
import TotalSaving from '../widgets/totalSaving'
import GoldSaving from '../widgets/goldSaving'
import MetLifeSaving from '../widgets/metLifeSaving'
import MoneySaving from '../widgets/moneySaving'
import HajSaving from '../widgets/hajSaving'
import GoldTable from '../widgets/GoldTable'
import HajTable from '../widgets/hajTable'
import InvTable from '../widgets/invTable'
import SummaryTable from '../widgets/summaryTable'
import TotalEarning from '../widgets/totalEarning'
import ForexStatus from '../widgets/ForexStatus'
import ForexInvestmentTable from '../widgets/ForexInvestmentTable'

const Inv = () => {
  const url = process.env.REACT_APP_API_URL
  const [data, setData] = useState(null)
  const [totalData, setTotalData] = useState(null)
  const [earnData, setEarnData] = useState(null)
  const [loading, setLoading] = useState(true)

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invResponse, totalResponse, earnResponse] = await Promise.all([
          axios.get(url + 'inv'),
          axios.get(url + 'inv/total'),
          axios.get(url + 'inv/revenue'),
        ])

        if (earnResponse.data) {
          setEarnData(earnResponse.data)
        }
        if (invResponse.data) {
          setData(invResponse.data)
        }
        if (totalResponse.data) {
          setTotalData(totalResponse.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer fluid>
            <CRow>
              <CCol sm={6} lg={2}>
                <TotalSaving totalSaving={formatNumber(data?.total)} />
              </CCol>
              <CCol sm={6} lg={2}>
                <TotalEarning totalEarning={formatNumber(earnData)} />
              </CCol>
              <CCol sm={6} lg={2}>
                <GoldSaving GoldSaving={formatNumber(data?.gold?.saving)} />
              </CCol>
              <CCol sm={6} lg={2}>
                <MoneySaving moneySaving={formatNumber(data?.money)} />
              </CCol>
              <CCol sm={6} lg={2}>
                <MetLifeSaving metLifeSaving={formatNumber(data?.inv?.cash)} />
              </CCol>
              <CCol sm={6} lg={2}>
                <HajSaving HajSaving={formatNumber(data?.haj?.revenue)} />
              </CCol>
            </CRow>

            <CRow>
              <CCol sm={7} lg={7}>
                {data?.gold && <GoldTable data={data.gold} />}
              </CCol>

              <CCol sm={5} lg={5}>
                {data?.haj && <HajTable data={data.haj} />}
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={7} lg={7}>
                {totalData && <SummaryTable data={totalData} />}
              </CCol>

              <CCol sm={5} lg={5}>
                {totalData && data?.inv && <InvTable data={data.inv} />}
              </CCol>
            </CRow>

            {/* Forex section  */}
            <CRow>
              <CCol sm={7} lg={7}>
                {totalData && <ForexInvestmentTable />}
              </CCol>

              <CCol sm={5} lg={5}>
                {totalData && <ForexStatus />}
              </CCol>
            </CRow>
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Inv
