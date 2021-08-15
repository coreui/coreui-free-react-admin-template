import React, { useState, useEffect } from 'react'
// import './profile.css'
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
import axios from 'axios'

const ProfileEdit = () => {
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
  const [preImg, setPreImg] = useState('')
  const [sentImg, setSentImg] = useState(false)
  const preViewImg = (e) => {
    // console.log(e.target.files[0])
    // console.log('X')
    if (e) {
      console.log('Y')
      setSentImg(true)
      let fileReader = new FileReader()
      fileReader.readAsDataURL(e.target.files[0])
      setData({ ...data, userimage: e.target.files[0] })
      fileReader.onloadend = () => {
        setPreImg(fileReader.result)
        // setData({ ...data, userimage: fileReader.result })
      }
      // DATA.userimage = fileReader.result
      // setData({ ...data, userimage: fileReader.result })
      // console.log(fileReader)
    }
  }
  // const handleChangeImage = (e) => {
  //   let reader = new FileReader()
  //   let file = e.target.files[0]
  //   setFileButton(e.target)
  //   setRegisterForm({ ...data, userimage: file })
  //   reader.onloadend = () => {
  //     setPreviewURL(reader.result)
  //   }
  //   reader.readAsDataURL(file)
  //   // // call the modal
  //   // setIsModal(true)
  // }
  const getProfile = () => {
    axios
      .get('api/profile')
      .then((res) => {
        // console.log(data)
        setData({ ...data, ...res.data })
        setPreImg(res.data.userimage)
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
  const handleSave = () => {
    console.log(data)
    axios
      .patch('api/profile', data)
      .then((res) => {
        // console.log(data)
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
    if (sentImg) {
      let DATA = new FormData()
      DATA.append('userimage', data.userimage)
      // console.log(data.userimage)
      // console.log(DATA.get('userimage'))
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
      // send to backend
      // then redirect to login
      axios
        .patch('api/profile', DATA, config)
        .then((res) => {
          alert(`completed image`)
          console.log(res.data)
        })
        .catch((err) => {
          switch (err.response.status) {
            default:
              alert(err.response.data.description)
              break
          }
        })
    }
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
    <CContainer>
      <CRow>
        <CCol md="4" className="mb-3">
          <CCard>
            <CCardBody>
              <CInputGroup className="d-flex flex-column align-items-center text-center">
                <img src={preImg} alt="Admin" className="rounded-circle" width="150" />
                <CFormControl type="file" onChange={preViewImg} style={{ width: '100%' }} />
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
                  onChange={(e) => setData({ ...github, github: e.target.value })}
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
  )
}

export default ProfileEdit
