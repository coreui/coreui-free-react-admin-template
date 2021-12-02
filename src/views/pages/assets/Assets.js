/* eslint-disable */
import React, { lazy } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CCardTitle,
  CCardSubtitle,
  CCardText
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  ciSearch
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

const WidgetsDropdown = lazy(() => import('../../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../../widgets/WidgetsBrand.js'))
import MyDrag, { Basic }  from '../../../components/AttachFiles.js'

export const Assets = () => {
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  return (
    <>
    {/* <div className="d-flex p-2 docs-highlight border-bottom">
      <div>
        <div>Browse Library</div>
        <div>Welcome back, Asabe! We missed you.</div>
      </div>
      <div>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
      </div>
    </div> */}
    <CContainer fluid class="border-bottom"  style={{margin: '0 .5em 1em .5em'}}>

    <CRow>
      <CCol xs={12} md={8} xl={8}>
        <CRow>Browse Library</CRow>
        <CRow>Welcome back, Asabe! We missed you.</CRow>
      </CCol>
      <CCol xs={12} md={4} xl={4}>
      <CInputGroup className="flex-nowrap">
  <CInputGroupText id="addon-wrapping">@</CInputGroupText>
  <CFormInput placeholder="" aria-label="Username" aria-describedby="addon-wrapping" />
</CInputGroup>
      {/* <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/> */}
      </CCol>
    </CRow>
    </CContainer>

    <CContainer className="mb-5" >
      <CRow xs={12} md={4} xl={4}>
        <CCol xs={12} md={4} xl={4}>
        <CCard>
          <CCardBody>
            <CCardTitle style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{fontSize: '10px'}}>
                Number of Videos<br/> in Library
              </div>
              <div>
                <span style={{background: 'rgba(122, 255, 89, 0.5)', borderRadius: '5px', padding: '5px', fontSize: '11px', color: '#00A624'}}>+12%</span>
                <span style={{fontSize: '11px', paddingLeft: '15px', color: '#9F9F9F'}}>up from last week</span>
              </div>
              </CCardTitle>
            {/* <CCardSubtitle className="mb-2 text-medium-emphasis">Card subtitle</CCardSubtitle> */}
            <div style={{display: 'flex', marginTop: '25px', justifyContent: 'space-between'}}>
              <h3>63,000,000</h3>
              <div>
              <span style={{background: '#00F0FE', borderRadius: '5px', padding: '5px', fontSize: '13px', color: '#000'}}>Total</span>
              </div>
            </div>
            <div style={{display: 'flex', marginTop: '15px', alignItems: 'center', justifyContent: 'space-between'}}>
              <h3>63,000</h3>
              <div>
                <span style={{background: '#00F0FE', borderRadius: '5px', padding: '5px',fontSize: '13px', color: '#000'}}>Today</span>
              </div>
            </div>
          </CCardBody>
        </CCard>
        </CCol>
        <CCol xs={12} md={8} xl={8}>
          {/* <MyDrag /> */}
          <Basic />
        </CCol>
      </CRow>
    </CContainer>


      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic {' & '} Sales</CCardHeader>
            <CCardBody>
              <CRow>
              </CRow>

              <br />

              
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

