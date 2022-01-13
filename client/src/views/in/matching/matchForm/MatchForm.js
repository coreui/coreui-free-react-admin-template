/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectLogin } from '../../../../slices/loginSlice'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormControl,
  CButton,
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'

const strToArray = (str) => {
  let ad = [str]

  if (str.includes(',')) {
    ad = str.split(',')
  }
  if (str.includes('，')) {
    ad = str.split('，')
  }
  ad = ad.map((a) => (a = a.trim()))
  return ad
}
const MatchForm = () => {
  const { identity } = useParams()
  const history = useHistory()
  const senior = identity === 'senior' ? true : false
  const { email: userEmail, name: userName, studentID } = useSelector(selectLogin)
  const [degrees, setDegrees] = useState([false, false, false])
  const [hasPapers, setHasPapers] = useState([false, false, false, false])

  const formTemplate = senior
    ? {
        identity: 'senior',
        name: userName,
        email: userEmail,
        major: [],
        degree: '',
        school: '',
        gpa: '',
        number: '',
        admission: [],
      }
    : {
        identity: 'junior',
        name: userName,
        email: userEmail,
        studentID: studentID,
        major: [],
        degree: '',
        gpa: '',
        hasPaper: '',
        school1: [],
        school2: [],
        school3: [],
      }
  const [requiredStyle, setRequiredStyle] = useState(
    senior
      ? {
          name: '',
          major: '',
          email: '',
          school: '',
          number: '',
        }
      : {
          name: '',
          email: '',
          major: '',
          school1: '',
          school2: '',
        },
  )
  const [dataForm, setDataForm] = useState(formTemplate)
  const handleInputChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value })
    handleInputRadio(e)
    if (requiredStyle.hasOwnProperty(e.target.name)) {
      if (e.target.value === '')
        setRequiredStyle({ ...requiredStyle, [e.target.name]: 'border-3 border-danger' })
      else setRequiredStyle({ ...requiredStyle, [e.target.name]: '' })
    }
  }
  const handleInputArray = (e) => {
    const a = strToArray(e.target.value)
    setDataForm({ ...dataForm, [e.target.name]: a })
    if (requiredStyle.hasOwnProperty(e.target.name)) {
      if (e.target.value === '')
        setRequiredStyle({ ...requiredStyle, [e.target.name]: 'border-3 border-danger' })
      else setRequiredStyle({ ...requiredStyle, [e.target.name]: '' })
    }
  }
  const handleInputRadio = (e) => {
    if (e.target.name === 'hasPaper') {
      switch (e.target.value) {
        case '0':
          setHasPapers([true, false, false, false])
          break
        case '1':
          setHasPapers([false, true, false, false])
          break
        case '2':
          setHasPapers([false, false, true, false])
          break
        case '3':
          setHasPapers([false, false, false, true])
          break
        default:
          break
      }
    } else if (e.target.name === 'degree') {
      switch (e.target.value) {
        case '0':
          setDegrees([true, false, false])
          break
        case '1':
          setDegrees([false, true, false])
          break
        case '2':
          setDegrees([false, false, true])
          break
        default:
          break
      }
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (dataForm.gpa > 4.3 || isNaN(dataForm.gpa)) {
      alert('please fill in correct gpa')
      return
    }
    axios
      .post('/api/study/fillForm', dataForm)
      .then(() => {
        alert('已送出')
        history.push('/matching')
      })
      .catch((err) => {
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
  }
  const handleBack = (e) => {
    e.preventDefault()
    history.push('/matching')
  }
  const getPrevForm = () => {
    axios
      .get('/api/study/form')
      .then((res) => {
        console.log('degree', res.data)
        if (res.data.degree) {
          setDataForm({ ...res.data, ['degree']: res.data.degree[0] })
          switch (res.data.degree[0]) {
            case '0':
              setDegrees([true, false, false])
              console.log('degree0')
              break
            case '1':
              setDegrees([false, true, false])
              console.log('degree1')
              break
            case '2':
              setDegrees([false, false, true])
              console.log('degree2')
              break

            default:
              break
          }
        }
        if (res.data.hasPaper) {
          switch (res.data.hasPaper) {
            case '0':
              setHasPapers([true, false, false, false])
              break
            case '1':
              setHasPapers([false, true, false, false])
              break
            case '2':
              setHasPapers([false, false, true, false])
              break
            case '3':
              setHasPapers([false, false, false, true])
              break

            default:
              break
          }
        }
      })
      .then(() => console.log('hp', dataForm.hasPaper))
      .catch(
        (err) => err.response.data.description && alert('錯誤\n' + err.response.data.description),
      )
  }
  useEffect(() => {
    getPrevForm()
  }, [studentID])
  return (
    <div className="matching-form">
      <div className="d-flex flex-row align-items-center text-color-black">
        <CRow className="justify-content-center">
          <CCol md="11" lg="10" xl="9">
            <CCard className="mx-2">
              <CCardBody className="px-5">
                <button
                  className="align-self-baseline btn btn-ghost-info my-3"
                  onClick={handleBack}
                >
                  <CIcon name="cil-arrow-left" size="lg" />
                </button>
                <CForm>
                  <h2>
                    {senior ? '學長姐' : '學弟妹'}您好，請於2/1前填妥以下表單，我們才會幫您配對
                    {senior ? '您的學弟妹' : '輔導您的學長姐'}喔！
                  </h2>
                  <p className="text-medium-emphasis">開通EEChain</p>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-layers" />
                    </CInputGroupText>
                    <CFormControl
                      className={requiredStyle.name}
                      data-for="name"
                      data-tip="Please fill in your name"
                      placeholder="Name*"
                      value={dataForm.name}
                      name="name"
                      onChange={handleInputChange}
                    />
                    <ReactTooltip id="name" place="top" type="dark" effect="solid" />
                  </CInputGroup>
                  {!senior && (
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon="cil-dollar" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="studentID"
                        data-tip="Please fill in your student number"
                        placeholder="Student number"
                        name="studentID"
                        value={dataForm.studentID}
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="studentID" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                  )}
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-building" />
                    </CInputGroupText>
                    <CFormControl
                      data-for="email"
                      data-tip="Please fill in your email"
                      placeholder="Email*"
                      value={dataForm.email}
                      name="mail"
                      onChange={handleInputChange}
                    />
                    <ReactTooltip id="email" place="top" type="dark" effect="solid" />
                  </CInputGroup>
                  <h5 className="text-medium-emphasis">
                    填入您{senior ? '現在研究的領域' : '想申請的領域(若有多個請用 ，/ , 分開)'}
                  </h5>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-braille" />
                    </CInputGroupText>
                    <CFormControl
                      data-for="major"
                      data-tip="What subjects or fields are you majar?"
                      placeholder="Major"
                      value={dataForm.major}
                      name="major"
                      onChange={senior ? handleInputChange : handleInputArray}
                    />
                  </CInputGroup>
                  <h5 className="text-medium-emphasis">
                    {senior ? '入學時持有的最高學位' : '想申請的學位'}
                  </h5>
                  <CInputGroup className="mb-4">
                    <div className="d-flex justify-content-around">
                      <div style={{ 'margin-right': '1.2rem' }}>
                        <CFormCheck
                          type="radio"
                          name="degree"
                          value="0"
                          label="MS"
                          onChange={handleInputChange}
                          checked={degrees[0]}
                        />
                      </div>
                      <div style={{ 'margin-right': '1.2rem' }}>
                        <CFormCheck
                          type="radio"
                          name="degree"
                          value="1"
                          label="PhD"
                          onChange={handleInputChange}
                          checked={degrees[1]}
                        />
                      </div>
                      {senior ? null : (
                        <div>
                          <CFormCheck
                            type="radio"
                            name="degree"
                            value="2"
                            label="Both"
                            onChange={handleInputChange}
                            checked={degrees[2]}
                          />
                        </div>
                      )}
                    </div>
                  </CInputGroup>
                  <h5 className="text-medium-emphasis">請填入之前的在校GPA</h5>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-education" />
                    </CInputGroupText>
                    <CFormControl
                      data-for="gpa"
                      data-tip="GPA(in 4.3 scale)"
                      placeholder="gpa"
                      value={dataForm.gpa}
                      name="gpa"
                      onChange={handleInputChange}
                    />
                    <ReactTooltip id="gpa" place="top" type="dark" effect="solid" />
                  </CInputGroup>
                  {senior ? (
                    <>
                      <h5 className="text-medium-emphasis">請填入您現在就讀的學校</h5>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon="cil-dollar" />
                        </CInputGroupText>
                        <CFormControl
                          data-for="school"
                          data-tip="your current school"
                          placeholder="School"
                          name="school"
                          value={dataForm.school}
                          onChange={handleInputChange}
                        />
                        <ReactTooltip id="school" place="top" type="dark" effect="solid" />
                      </CInputGroup>
                      <h5 className="text-medium-emphasis">請問您想接收幾位學弟妹呢?</h5>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon="cil-education" />
                        </CInputGroupText>
                        <CFormControl
                          data-for="number"
                          data-tip="Number of juniors you'd like to receive"
                          placeholder="number"
                          value={dataForm.number}
                          name="number"
                          onChange={handleInputChange}
                        />
                        <ReactTooltip id="number" place="top" type="dark" effect="solid" />
                      </CInputGroup>
                      <h5 className="text-medium-emphasis">
                        填入您之前有錄取的學校(若有多個請用 ，/ , 分開)
                      </h5>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon="cil-braille" />
                        </CInputGroupText>
                        <CFormControl
                          data-for="admission"
                          data-tip="What schools do you get admitted?"
                          placeholder="Admissions"
                          value={dataForm.admission}
                          name="admission"
                          onChange={handleInputArray}
                        />
                        <ReactTooltip id="admission" place="top" type="dark" effect="solid" />
                      </CInputGroup>
                    </>
                  ) : (
                    <>
                      <h5 className="text-medium-emphasis">發論文的經驗</h5>
                      <div className="d-flex justify-content-around">
                        <CInputGroup className="mb-4">
                          <div className="col-3">
                            <CFormCheck
                              type="radio"
                              name="hasPaper"
                              id="gridRadios1"
                              value="0"
                              label="無論文經驗"
                              onChange={handleInputChange}
                              checked={hasPapers[0]}
                            />
                          </div>
                          <div className="col-3">
                            <CFormCheck
                              type="radio"
                              name="hasPaper"
                              id="gridRadios2"
                              value="1"
                              label="已投稿但尚未公佈"
                              onChange={handleInputChange}
                              checked={hasPapers[1]}
                            />
                          </div>
                          <div className="col-3">
                            <CFormCheck
                              type="radio"
                              name="hasPaper"
                              id="gridRadios3"
                              value="2"
                              label="已發表 1 篇"
                              onChange={handleInputChange}
                              checked={hasPapers[2]}
                            />
                          </div>
                          <div className="col-3">
                            <CFormCheck
                              type="radio"
                              name="hasPaper"
                              id="gridRadios4"
                              value="3"
                              label="已發表 2 篇以上"
                              onChange={handleInputChange}
                              checked={hasPapers[3]}
                            />
                          </div>
                        </CInputGroup>
                      </div>
                      <h5 className="text-medium-emphasis">你的夢想學校(若有多個請用，/ , 分開)</h5>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon="cil-dollar" />
                        </CInputGroupText>
                        <CFormControl
                          data-for="school1"
                          data-tip="Please fill in your dream schools"
                          placeholder="Dream college"
                          name="school1"
                          value={dataForm.school1}
                          onChange={handleInputArray}
                        />
                        <ReactTooltip id="school1" place="top" type="dark" effect="solid" />
                      </CInputGroup>
                      <h5 className="text-medium-emphasis">
                        稍有把握的學校(若有多個請用，/ , 分開)
                      </h5>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon="cil-dollar" />
                        </CInputGroupText>
                        <CFormControl
                          data-for="school2"
                          data-tip="Please fill in your confident colleges"
                          placeholder="Confident colleges"
                          name="school2"
                          value={dataForm.school2}
                          onChange={handleInputArray}
                        />
                        <ReactTooltip id="school2" place="top" type="dark" effect="solid" />
                      </CInputGroup>
                      <h5 className="text-medium-emphasis">你的保底學校(若有多個請用，/ , 分開)</h5>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon="cil-dollar" />
                        </CInputGroupText>
                        <CFormControl
                          data-for="school3"
                          data-tip="Please fill your guaranteed colleges"
                          placeholder="Guaranteed colleges"
                          name="school3"
                          value={dataForm.school3}
                          onChange={handleInputArray}
                        />
                        <ReactTooltip id="school3" place="top" type="dark" effect="solid" />
                      </CInputGroup>
                    </>
                  )}
                  <CRow className="justify-content-center mt-3">
                    <div className="d-flex d-flex justify-content-center">
                      <CButton
                        color="dark"
                        onClick={(e) => {
                          let miss = []
                          for (let info in requiredStyle) {
                            if (!dataForm[info]) {
                              miss.push(info)
                            }
                          }
                          if (miss.length !== 0) {
                            let missStyle = requiredStyle
                            for (let m of miss) {
                              missStyle[m] = 'border-3 border-danger'
                            }
                            alert(`You have to fill out ${miss}`)
                            setRequiredStyle({ ...requiredStyle, ...missStyle })
                            return
                          }
                          handleSubmit(e)
                        }}
                      >
                        確認送出
                      </CButton>
                    </div>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </div>
  )
}
MatchForm.propTypes = {
  identity: PropTypes.string,
  setIdentity: PropTypes.func,
  setOpened: PropTypes.func,
}
export default MatchForm
