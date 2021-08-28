import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openEditImageModal } from '../../../slices/profileSlice'
import { selectLogin } from '../../../slices/loginSlice'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
  CListGroup,
  CListGroupItem,
  CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ProfileImageEditor from './ProfileImageEditor'
import axios from 'axios'

const ProfileEdit = () => {
  const dispatch = useDispatch()
  const { imgSrc } = useSelector(selectLogin)
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
    github: 'noidname01',
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

  const getProfile = () => {
    axios
      .get('api/profile')
      .then((res) => {
        // console.log(data)
        setData({ ...data, ...res.data })
      })
      .catch((err) => {
        console.log(err)
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
  const handleSave = () => {
    console.log(data)
    axios
      .patch('api/profile', data)
      .then((res) => {
        alert(`completed`)
      })
      .catch((err) => {
        console.log(err)
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
  const handleOccupationChange = (index, key, value) => {
    let list = [...data.Occupation]
    let item = { ...list[index] }
    item[key] = value
    list[index] = item
    setData({ ...data, Occupation: list })
  }

  useEffect(async () => {
    await getProfile()
  }, [])
  return (
    <>
      <ProfileImageEditor />
      <CContainer>
        <CRow>
          <CCol md="4" className="mb-3">
            <CCard>
              <CCardBody>
                <CInputGroup className="d-flex flex-column align-items-center text-center">
                  <img src={imgSrc} alt="Admin" className="rounded-circle" width="150" />
                  <CButton
                    onClick={(e) => {
                      e.preventDefault()
                      dispatch(openEditImageModal())
                    }}
                  >
                    Edit
                  </CButton>

                  <div className="mt-3">
                    <CFormControl
                      value={data.username}
                      onChange={(e) => setData({ ...data, username: e.target.value })}
                    />
                    <CFormControl
                      className="text-secondary mb-1"
                      value={data.profile}
                      onChange={(e) => setData({ ...data, profile: e.target.value })}
                    />
                    <CFormControl
                      className="text-muted font-size-sm"
                      value={data.CC}
                      onChange={(e) => setData({ ...data, CC: e.target.value })}
                    />
                    <CButton>Follow</CButton>
                    <CButton>Message</CButton>
                  </div>
                </CInputGroup>
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
                  <CFormControl
                    className="text-secondary"
                    value={data.web}
                    onChange={(e) => setData({ ...data, web: e.target.value })}
                  />
                </CListGroupItem>
                <CListGroupItem>
                  <h6 className="mb-0">
                    <CAvatar>
                      <CIcon name="cib-github"></CIcon>
                    </CAvatar>
                    Github
                  </h6>
                  <CFormControl
                    className="text-secondary"
                    value={data.github}
                    onChange={(e) => setData({ ...data, github: e.target.value })}
                  />
                </CListGroupItem>
                <CListGroupItem>
                  <h6 className="mb-0">
                    <CAvatar>
                      <CIcon name="cib-linkedin"></CIcon>
                    </CAvatar>
                    Linkedin
                  </h6>
                  <CFormControl
                    className="text-secondary"
                    value={data.Linkedin}
                    onChange={(e) => setData({ ...data, Linkedin: e.target.value })}
                  />
                </CListGroupItem>
                <CListGroupItem>
                  <h6 className="mb-0">
                    <CAvatar>
                      <CIcon name="cib-instagram"></CIcon>
                    </CAvatar>
                    Instagram
                  </h6>
                  <CFormControl className="text-secondary" value="bootdey" />
                </CListGroupItem>
                <CListGroupItem>
                  <h6 className="mb-0">
                    <CAvatar>
                      <CIcon name="cib-facebook"></CIcon>
                    </CAvatar>
                    Facebook
                  </h6>
                  <CFormControl
                    className="text-secondary"
                    value={data.facebook}
                    onChange={(e) => setData({ ...data, facebook: e.target.value })}
                  />
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
                    <CFormControl
                      value={data.nickname}
                      onChange={(e) => setData({ ...data, nickname: e.target.value })}
                    />
                  </CCol>
                </CRow>
                <hr />
                <CRow>
                  <CCol sm="3">
                    <h6 className="mb-0">Email</h6>
                  </CCol>
                  <CCol sm="9" className="text-secondary">
                    <CFormControl
                      value={data.publicEmail}
                      onChange={(e) => setData({ ...data, publicEmail: e.target.value })}
                    />
                  </CCol>
                </CRow>
                <hr />
                <CRow>
                  <CCol sm="3">
                    <h6 className="mb-0">Mobile</h6>
                  </CCol>
                  <CCol sm="9" className="text-secondary">
                    <CFormControl
                      value={data.cellphone}
                      onChange={(e) => setData({ ...data, cellphone: e.target.value })}
                    />
                  </CCol>
                </CRow>
                <hr />
                <CRow>
                  <CButton onClick={handleSave}>Save</CButton>
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
                        <CFormControl
                          value={data.major}
                          onChange={(e) => setData({ ...data, major: e.target.value })}
                        />
                      </CCol>
                    </CRow>
                    <hr />
                    <CRow>
                      <CCol sm="3">
                        <h6 className="mb-0">Master</h6>
                      </CCol>
                      <CCol sm="9" className="text-secondary">
                        <CFormControl
                          value={data.master}
                          onChange={(e) => setData({ ...data, master: e.target.value })}
                        />
                      </CCol>
                    </CRow>
                    <hr />
                    <CRow>
                      <CCol sm="3">
                        <h6 className="mb-0">Doctor</h6>
                      </CCol>
                      <CCol sm="9" className="text-secondary">
                        <CFormControl
                          value={data.doctor}
                          onChange={(e) => setData({ ...data, doctor: e.target.value })}
                        />
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
                        <CFormControl
                          value={data.Occupation.length != 0 ? data.Occupation[0].C : ''}
                          onChange={(e) => handleOccupationChange(0, 'C', e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <hr />
                    <CRow>
                      <CCol sm="4">
                        <h6 className="mb-0">Department</h6>
                      </CCol>
                      <CCol sm="9" className="text-secondary">
                        <CFormControl
                          value={data.Occupation.length != 0 ? data.Occupation[0].O : ''}
                          onChange={(e) => handleOccupationChange(0, 'O', e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <hr />
                    <CRow>
                      <CCol sm="4">
                        <h6 className="mb-0">Position</h6>
                      </CCol>
                      <CCol sm="9" className="text-secondary">
                        <CFormControl
                          value={data.Occupation.length != 0 ? data.Occupation[0].P : ''}
                          onChange={(e) => handleOccupationChange(0, 'P', e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <hr />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default ProfileEdit
