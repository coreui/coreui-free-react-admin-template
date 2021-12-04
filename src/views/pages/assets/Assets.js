/* eslint-disable */
import React, { lazy, useState, useEffect } from 'react'
import axios from 'axios'
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
  CCardText,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
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
import lock from 'src/assets/images/lock.png'
import play from 'src/assets/images/play.png'
import rect from 'src/assets/images/rect.png'

const WidgetsDropdown = lazy(() => import('../../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../../widgets/WidgetsBrand.js'))
import MyDrag, { Basic }  from '../../../components/AttachFiles.js'


const AssetsModal = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>Launch demo modal</CButton>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Assets Title</CModalTitle>
        </CModalHeader>
        <CModalBody>Woohoo, you&#39;re reading this text in a modal!</CModalBody>
        <CModalFooter style={{textAlign: 'center'}}>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export const Assets = () => {
  const [visible, setVisible] = useState(false)

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const [adminId, setAdminId] = useState(localStorage.getItem('session_id'))

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

    
    const viewcreatives = async () => {
      try{
        const res = await axios.get(`https://services.projects.sbs/library/content?page=0&size=100&admin_id=${adminId}`)
        console.log(res.data.data.items)
        // setItems(res.data.data.items)
      }catch(error) {
        console.log(error)
      }
  }

  const aproveAsset = async (id) => {
    try {
      const res = await axios.patch(
        `https://services.projects.sbs/library/content`,
        {
        user_id: adminId,
        visibility: 1,
        id: id,
        price: 3456
       }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    viewcreatives()
  }, [])

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
    <CModal alignment="center" size="lg" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Assets title</CModalTitle>
        </CModalHeader>
        <>
        {/* <div style={{position: "relative", width: '100%', height: '160px'}}>
                <img src={rect} alt="rect" style={{width: '100%', height: '160px'}} />
                <img src={play} onClick={() => setVisible(!visible)} alt="lock" style={{position: 'absolute', display: 'flex', bottom:'45% ', left:'45% ', cursor: 'pointer',  width: '30px', height: '30px'}} />
                </div> */}

                <video controls>
                  <source src="myVideo.webm" type="video/webm" />
                  <source src="myVideo.mp4" type="video/mp4" />
                  <img src={rect} title="Your browser does not support the <video> tag" />
                  <p>Your browser doesn't support HTML5 video. Here is
                      a <a href="myVideo.mp4">link to the video</a> instead.</p>
                </video>
        </>
        <CModalBody>Woohoo, you&#39;re reading this text in a modal!</CModalBody>
        <CModalFooter style={{textAlign: 'center'}}>
          <CButton color="primary"  style={{color: 'white'}} onClick={() => aproveAsset(1)}>
            Approve
          </CButton>
          <CButton color="danger" style={{color: 'white'}} onClick={() => setVisible(false)}>Reject</CButton>
        </CModalFooter>
      </CModal>
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

    <>
        <div style={{display: 'flex', margin :'0 0 20px 0', padding: '.5em 0', width: '100%', justifyContent: 'space-between'}}>
          <div style={{display: 'flex'}}>
            <div style={{margin: '0 1em 0 0'}}>
              Media Type:
              <select>
                <option value="">Pick Asset Type</option>
                <option value="videos">Videos</option>
                <option value="photos">Photos</option>
              </select>
            </div>
            <div style={{margin: '0 1em'}}>
              Tags: 
              <select>
              <option value="">Pick a tag</option>
              <option value="documentary">Documentary</option>
              <option>Pick a tag</option>
              </select>
            </div>
            <div style={{ padding :'.5em 1em', margin :'0 1em', borderRadius: '5px', color: '#1EAAB2', border: '1px solid #1EAAB2', fontSize: '12px', textAlign: 'center'}}>
              Bulk Select
            </div>
          </div>

          <div style={{backgroundColor: '#c4c4c4', padding :'.5em 1em', marginRight: '10px', borderRadius: '5px', color: '#fff', fontSize: '12px', textAlign: 'center'}}>
            Today - Oct, 21
          </div>

        </div>
      </>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Review and Approve Videos</CCardHeader>
            <CCardBody>
              <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', width: '100%'}}>
                <div style={{position: "relative", width: '24%', height: '160px'}}>
                <img src={rect} alt="rect" style={{width: '100%', height: '160px'}} />
                <img src={lock} onClick={() => setVisible(!visible)} alt="lock" style={{position: 'absolute', display: 'flex', bottom:'45% ', left:'45% ', cursor: 'pointer',  width: '30px', height: '30px'}} />
                </div>
                <div style={{position: "relative", width: '24%', height: '160px'}}>
                <img src={rect} alt="rect" style={{width: '100%', height: '160px'}} />
                <img src={lock} onClick={() => setVisible(!visible)} alt="lock" style={{position: 'absolute', display: 'flex', bottom:'45% ', left:'45% ', cursor: 'pointer',  width: '30px', height: '30px'}} />
                </div>
                <div style={{position: "relative", width: '24%', height: '160px'}}>
                <img src={rect} alt="rect" style={{width: '100%', height: '160px'}} />
                <img src={lock} onClick={() => setVisible(!visible)} alt="lock" style={{position: 'absolute', display: 'flex', bottom:'45% ', left:'45% ', cursor: 'pointer',  width: '30px', height: '30px'}} />
                </div>
                <div style={{position: "relative", width: '24%', height: '160px'}}>
                <img src={rect} alt="rect" style={{width: '100%', height: '160px'}} />
                <img src={lock} onClick={() => setVisible(!visible)} alt="lock" style={{position: 'absolute', display: 'flex', bottom:'45% ', left:'45% ', cursor: 'pointer',  width: '30px', height: '30px'}} />
                </div>
                <div style={{position: "relative", width: '24%', height: '160px'}}>
                <img src={rect} alt="rect" style={{width: '100%', height: '160px'}} />
                <img src={lock} onClick={() => setVisible(!visible)} alt="lock" style={{position: 'absolute', display: 'flex', bottom:'45% ', left:'45% ', cursor: 'pointer',  width: '30px', height: '30px'}} />
                </div>
              </div>
                
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

<div style={{marginTop: '4em'}}></div>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Videos Library</CCardHeader>
            <CCardBody>
            <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', width: '100%'}}>
                <div style={{position: "relative", width: '24%', height: '160px'}}>
                <img src={rect} alt="rect" style={{width: '100%', height: '160px'}} />
                <img src={play} alt="play" style={{position: 'absolute', display: 'flex', bottom:'45% ', left:'45% ', cursor: 'pointer',  width: '30px', height: '30px'}} />
                </div>
                <div style={{position: "relative", width: '24%', height: '160px'}}>
                <img src={rect} alt="rect" style={{width: '100%', height: '160px'}} />
                <img src={play} alt="play" style={{position: 'absolute', display: 'flex', bottom:'45% ', left:'45% ', cursor: 'pointer',  width: '30px', height: '30px'}} />
                </div>
                <div style={{position: "relative", width: '24%', height: '160px'}}>
                <img src={rect} alt="rect" style={{width: '100%', height: '160px'}} />
                <img src={play} alt="play" style={{position: 'absolute', display: 'flex', bottom:'45% ', left:'45% ', cursor: 'pointer',  width: '30px', height: '30px'}} />
                </div>
                <div style={{position: "relative", width: '24%', height: '160px'}}>
                <img src={rect} alt="rect" style={{width: '100%', height: '160px'}} />
                <img src={play} alt="play" style={{position: 'absolute', display: 'flex', bottom:'45% ', left:'45% ', cursor: 'pointer',  width: '30px', height: '30px'}} />
                </div>
                <div style={{position: "relative", width: '24%', height: '160px'}}>
                <img src={rect} alt="rect" style={{width: '100%', height: '160px'}} />
                <img src={play} alt="play" style={{position: 'absolute', display: 'flex', bottom:'45% ', left:'45% ', cursor: 'pointer',  width: '30px', height: '30px'}} />
                </div>
              </div>

              
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

