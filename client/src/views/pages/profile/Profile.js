import React, { useState, useEffect } from 'react'
// import './profile.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
  CListGroup,
  CListGroupItem,
  CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import 'axios'
import axios from 'axios'

const Profile = () => {
  let recommendation = []
  const [recruitment, setRecruitment] = useState([])
  const getRecruitment = () => {
    axios
      .get('/api/recruitment')
      .then((res) => {
        setRecruitment(res.data)
        console.log(res)
      })
      .catch(
        (err) => err.response.data.description && alert('錯誤\n' + err.response.data.description),
      )
  }
  const getProfile = () => {
    axios
      .get('api/profile')
      .then((res) => {
        // console.log(data)
        setData({ ...data, ...res.data })
      })
      .catch((err) => {
        // console.log(err)
        switch (err.response.status) {
          case 404:
            alert(err.response.data.description)
            break
          default:
            alert(err.response.data.description)
            break
        }
      })
  }
  const [data, setData] = useState({
    account: 'B08901072',
    username: 'Tim Wang',
    nickname: '提姆',
    profile: '一人救全系', //自介
    major: 'NTUEE',
    double_major: '',
    minor: '',
    master: '',
    doctor: '',
    publicEmail: 'b08901072@ntu.edu.tw', //mongoose.SchemaTypes.Email ?
    cellphone: '0987654321',
    CC: 'Taipei, Taiwan', //city+country
    web: '',
    facebook: 'https://www.facebook.com/noidname',
    Linkedin: '',
    Occupation: [
      {
        O: '', //部門?
        P: 'CEO & CTO', //職稱?
        C: '友廷股份有限公司', //公司?
      },
    ],
    userimage: 'https://avatars.githubusercontent.com/u/55401762?v=4', // not same as schema
  })

  useEffect(() => {
    getRecruitment()
    getProfile()
  }, [])
  const DeleteRecruitment = () => {}
  const showRecruitment = (Recruitment) => {
    console.log(Recruitment)
    return Recruitment.map((post, i) => {
      const editPath = '/#/editRecruitment/' + post._id
      return (
        <>
          <CRow sm="3">
            <CCol>
              <h6 className="mb-0">post {i + 1}</h6>
            </CCol>
            <CCol sm="5">{post.title.title}</CCol>
            <CButton className="col-sm-2" color="dark" href={editPath}>
              Edit
            </CButton>
            <CButton className="col-sm-2" color="primary" onClick={DeleteRecruitment}>
              Delete
            </CButton>
          </CRow>
          <hr />
        </>
      )
    })
  }
  return (
    <CContainer>
      <CRow>
        <CCol md="4" className="mb-3">
          <CCard>
            <CCardBody>
              <div className="d-flex flex-column align-items-center text-center">
                <img src={data.userimage} alt="Admin" className="rounded-circle" width="150" />
                <div className="mt-3">
                  <h4>{data.username}</h4>
                  <p className="text-secondary mb-1">{data.profile}</p>
                  <p className="text-muted font-size-sm">{data.CC}</p>
                  <CButton>Follow</CButton>
                  <CButton>Message</CButton>
                </div>
              </div>
            </CCardBody>
          </CCard>
          <CCard className="mt-3">
            <CListGroup>
              <CListGroupItem>
                <h6 className="mb-0">
                  <CAvatar>
                    <CIcon name="website"></CIcon>
                  </CAvatar>
                  Website
                </h6>
                <span className="text-secondary">{data.web.data}</span>
              </CListGroupItem>
              <CListGroupItem>
                <h6 className="mb-0">
                  <CAvatar>
                    <CIcon name="cib-github"></CIcon>
                  </CAvatar>
                  Github
                </h6>
                <span className="text-secondary">noidname01</span>
              </CListGroupItem>
              <CListGroupItem>
                <h6 className="mb-0">
                  <CAvatar>
                    <CIcon name="cib-linkedin"></CIcon>
                  </CAvatar>
                  Linkedin
                </h6>
                <span className="text-secondary">{data.Linkedin}</span>
              </CListGroupItem>
              <CListGroupItem>
                <h6 className="mb-0">
                  <CAvatar>
                    <CIcon name="cib-instagram"></CIcon>
                  </CAvatar>
                  Instagram
                </h6>
                <span className="text-secondary">bootdey</span>
              </CListGroupItem>
              <CListGroupItem>
                <h6 className="mb-0">
                  <CAvatar>
                    <CIcon name="cib-facebook"></CIcon>
                  </CAvatar>
                  Facebook
                </h6>
                <span className="text-secondary">{data.facebook}</span>
              </CListGroupItem>
            </CListGroup>
          </CCard>
        </CCol>
        <CCol md="8">
          <CCard className="mb-3">
            <CCardBody>
              <CRow>
                <CCol sm="3">
                  <h6 className="mb-0">Nick Name</h6>
                </CCol>
                <CCol sm="9" className="text-secondary">
                  {data.nickname}
                </CCol>
              </CRow>
              <hr />
              <CRow>
                <CCol sm="3">
                  <h6 className="mb-0">Email</h6>
                </CCol>
                <CCol sm="9" className="text-secondary">
                  {data.publicEmail}
                </CCol>
              </CRow>
              <hr />
              <CRow>
                <CCol sm="3">
                  <h6 className="mb-0">Mobile</h6>
                </CCol>
                <CCol sm="9" className="text-secondary">
                  {data.cellphone.data}
                </CCol>
              </CRow>
              <hr />
              <CRow>
                <Link>
                  <CButton>Edit</CButton>
                </Link>
              </CRow>
            </CCardBody>
          </CCard>
          <CRow>
            <CCol sm="6" className="mb-3">
              <CCard className="h-100">
                <CCardBody>
                  <h6 className="d-flex align-items-center mb-3">
                    <i className="material-icons text-info mr-2">Education</i>
                  </h6>
                  <hr />
                  <CRow>
                    <CCol sm="3">
                      <h6 className="mb-0">Bachelor</h6>
                    </CCol>
                    <CCol sm="9" className="text-secondary">
                      {data.major}
                    </CCol>
                  </CRow>
                  <hr />
                  <CRow>
                    <CCol sm="3">
                      <h6 className="mb-0">Master</h6>
                    </CCol>
                    <CCol sm="9" className="text-secondary">
                      {data.master}
                    </CCol>
                  </CRow>
                  <hr />
                  <CRow>
                    <CCol sm="3">
                      <h6 className="mb-0">Doctor</h6>
                    </CCol>
                    <CCol sm="9" className="text-secondary">
                      {data.doctor}
                    </CCol>
                  </CRow>
                  <hr />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm="6" className="mb-3">
              <CCard className="h-100">
                <CCardBody>
                  <h6 className="d-flex align-items-center mb-3">
                    <i className="material-icons text-info mr-2">Current Occupation</i>
                  </h6>
                  <hr />
                  <CRow>
                    <CCol sm="4">
                      <h6 className="mb-0">Company</h6>
                    </CCol>
                    <CCol sm="9" className="text-secondary">
                      {data.Occupation.length != 0 ? data.Occupation[0].C : ''}
                    </CCol>
                  </CRow>
                  <hr />
                  <CRow>
                    <CCol sm="4">
                      <h6 className="mb-0">Department</h6>
                    </CCol>
                    <CCol sm="9" className="text-secondary">
                      {data.Occupation.length != 0 ? data.Occupation[0].O : ''}
                    </CCol>
                  </CRow>
                  <hr />
                  <CRow>
                    <CCol sm="4">
                      <h6 className="mb-0">Position</h6>
                    </CCol>
                    <CCol sm="9" className="text-secondary">
                      {data.Occupation.length != 0 ? data.Occupation[0].P : ''}
                    </CCol>
                  </CRow>
                  <hr />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          {recruitment.length !== 0 ? (
            <CCard className="mb-3">
              <CCardBody>{showRecruitment(recruitment)}</CCardBody>
            </CCard>
          ) : (
            <></>
          )}
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Profile
