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
import toast from 'react-hot-toast'
import ReactPaginate from 'react-paginate'
const WidgetsDropdown = lazy(() => import('../../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../../widgets/WidgetsBrand.js'))
import MyDrag, { Basic }  from '../../../components/AttachFiles.js'

function Items({ currentItems }) {
  return (
    <>
      {
        currentItems &&
        currentItems.filter(item => item.visibility === 0).map((each)=> {
            return (
              <div key={each?.id} style={{position: "relative", width: '24%', height: '160px'}}>
                  {
                    each?.asset_url ?  <>
                    <img src={each?.asset_url} alt={each?.title} style={{width: '100%', height: '160px'}} />
                    <img src={lock} onClick={() => handleVisible(each?.id, each.content_type, each.asset_url)} alt="lock" style={{position: 'absolute', display: 'flex', bottom:'45% ', left:'45% ', cursor: 'pointer',  width: '30px', height: '30px'}} />
                    </>: <>
                            <img src={rect} alt="rect" style={{width: '100%', height: '160px'}} />
                            <img src={lock} onClick={() => handleVisible(each?.id, each.content_type, each.asset_url)} alt="lock" style={{position: 'absolute', display: 'flex', bottom:'45% ', left:'45% ', cursor: 'pointer',  width: '30px', height: '30px'}} />
                        </>
                  }
                  {/* <button onClick={()=>aproveAsset(each.id)}>approve assets {each.id}</button> */}
                  </div>
            )
          })
        }
    </>
  );
}

export const Assets = () => {
  const [visible, setVisible] = useState(false)
  const [items, setItems] = useState([])
  const [approveLoading, setApproveLoading] = useState(false)
  const [approveToggle, setApproveToggle] = useState(0)
  const [chosenItem, setChosenItem] = useState({
    id: '',
    type: '',
    url: ''
  })

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const [adminId, setAdminId] = useState(localStorage.getItem('session_id'))

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, stItemsPerPage] = useState(20);

    
    const viewcreatives = async () => {
      try{
        const res = await axios.get(`https://services.projects.sbs/library/content?page=${pageCount}&size=${itemsPerPage}&admin_id=61989dc4b4693`)
        console.log(res.data.data.items)
        setItems(res.data.data.items)
      }catch(error) {
        console.log(error)
      }
  }

  const aproveAsset = async (id) => {
    try {
      setApproveLoading(true)
      const res = await axios.patch(
        `https://services.projects.sbs/library/content`,
        {
        user_id: '61989dc4b4693',
        visibility: 1,
        id: id,
        price: 3456
       }
      );
      console.log(res.data);
      toast.success('Assets has been approved', {
        duration: 2000
      })
      setApproveLoading(false)
    } catch (error) {
      setApproveLoading(false)
      console.log('error approving assets', error?.response?.data?.message, error?.response?.data?.error);
      toast.error(`unable to update asset ${error?.response?.data?.message} ${error?.response?.data?.error}`, {
        duration: 2000,
        style: {
          minWidth: '120px',
        },
      })
    }
  };

  useEffect(()=>{
    viewcreatives()
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const handleVisible = (id, type, url, status) => {
    if(status === 1){
      setApproveToggle(status)
    }
    setVisible(!visible)
    setChosenItem({
      ...chosenItem,
      id: id, type: type, url: url
    })
  }
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
        <div style={{width: '100%', minHeight:'300px'}}>
          {
                  chosenItem &&
                  chosenItem?.type === 'image' ? 
                  <div style={{position: "relative", width: '100%', height: '160px'}}>
                <img src={chosenItem?.url} alt="rect" style={{width: '100%', margin: '10px 20px', objectFit: 'contain',  height: '300px'}} />
                {/* <img src={play} onClick={() => setVisible(!visible)} alt="lock" style={{position: 'absolute', display: 'flex', bottom:'45% ', left:'45% ', cursor: 'pointer',  width: '30px', height: '30px'}} /> */}
                </div> 
                :
                <video controls>
                  <source src="myVideo.webm" type="video/webm" />
                  <source src="myVideo.mp4" type="video/mp4" />
                  <img src={chosenItem?.url} title="Your browser does not support the <video> tag" style={{width: '100%', height: '300px'}} />
                  <p>Your browser doesn't support HTML5 video. Here is
                      a <a href="myVideo.mp4">link to the video</a> instead.</p>
                </video>
                }
        </div>
        <CModalFooter style={{textAlign: 'center'}}>
          {
            approveToggle === 0 &&
            <>
              <CButton color="primary" disabled={approveLoading}  style={{color: 'white'}} onClick={() => aproveAsset(chosenItem?.id)}>
                { approveLoading ? 'Approving' : 'Approve' }
              </CButton>
              <CButton color="danger" style={{color: 'white'}} onClick={() => setVisible(false)}>Reject</CButton>
            </>
          }
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
                <Items currentItems={items} />
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
                <Items currentItems={items} />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
      <div>
        <select>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="150">150</option>
          <option value="200">200</option>
          <option value="250">250</option>
          <option value="300">300</option>
        </select>
      </div>
      </div>
    </>
  )
}

