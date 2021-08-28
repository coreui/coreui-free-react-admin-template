/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
} from '@coreui/react'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import PreviewBlock from '../editRecruitment/previewBlock'
import { freeSet } from '@coreui/icons'
const EditBlock = ({data}) => {
  const formTemplate = {
    title: data.title.title,
    name: data.title.name,
    desireWorkType: data.title.desire_work_type,
    contact: data.info.contact,
    email: data.info.email,
    diploma: data.info.diploma,
    file: data.image,
    _id:data._id,
  }
  const history = useHistory()
  const [isModal, setIsModal] = useState(false)
  const [blockModal, setBlockModal] = useState(false)
  const [previewURL, setPreviewURL] = useState(null)
  const [experience, setExperience] = useState(data.spec.experience)
  const [speciality, setSpeciality] = useState(data.spec.speciality)
  const [fileButton, setFileButton] = useState(null)
  const [recommendationForm, setRecommendationForm] = useState(formTemplate)
  const handleInputChange = (e) => {
    setRecommendationForm({ ...recommendationForm, [e.target.name]: e.target.value })
  }
  const addArray = (e) => {
    if (e.target.name === 'experience') {
      const newArray = experience.concat([''])
      setExperience(newArray)
    } else if (e.target.name === 'speciality') {
      const newArray = speciality.concat([''])
      setSpeciality(newArray)
    }
  }
  const handleInputArray = (e, index) => {
    if (e.target.name === 'experience') {
      const newArray = experience.map((exp, idx) => {
        if (idx !== index) return exp
        else return e.target.value
      })
      setExperience(newArray)
    } else if (e.target.name === 'speciality') {
      const newArray = speciality.map((req, idx) => {
        if (idx !== index) return req
        else return e.target.value
      })
      setSpeciality(newArray)
    }
  }
  const handleDeleteArray = (e, index) => {
    if (e.target.name === 'experience') {
      const newArray = experience.filter((exp, idx) => idx !== index)
      setExperience(newArray)
    } else if (e.target.name === 'speciality') {
      const newArray = speciality.filter((spec, idx) => idx !== index)
      setSpeciality(newArray)
    }
  }
  const handleChangeImage = (e) => {
    let reader = new FileReader()
    let file = e.target.files[0]
    setFileButton(e.target)
    setRecommendationForm({ ...recommendationForm, file: file })
    reader.onloadend = () => {
      setPreviewURL(reader.result)
    }
    reader.readAsDataURL(file)
    // call the modal
    setIsModal(true)
  }

  const clearImage = (e) => {
    setIsModal(false)
    setPreviewURL(null)
    setRecommendationForm({ ...recommendationForm, file: null })
    fileButton.value = ''
  }
  const handleSubmit = () => {
    const data = new FormData()
    data.append('title', recommendationForm.title)
    data.append('name', recommendationForm.name)
    data.append('desire_work_type', recommendationForm.desireWorkType)
    data.append('contact', recommendationForm.contact)
    data.append('email', recommendationForm.email)
    data.append('diploma', recommendationForm.diploma)
    data.append('_id',recommendationForm._id)
    for (let exp of experience) {
      data.append('experience[]', exp)
    }
    for (let spec of speciality) {
      data.append('speciality[]', spec)
    }
    data.append('file', recommendationForm.file)
    const config = 
      { "content-type": "multipart/form-data" }

    axios
      .patch('/api/recommendation', data, config)
      .then(() => {
        alert('已更新')
        history.push('/own_recommendation')
      })
      .catch((err) => {
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
  }
  return (
    <>
      <CModal visible={isModal} onDismiss={() => setIsModal(false)} alignment="center">
        <CModalHeader onDismiss={() => setIsModal(false)}>
          <CModalTitle>Preview Your Photo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <img src={previewURL} className="img-fluid container justify-content-center d-flex" />
        </CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={clearImage}>
            Clear
          </CButton>
          <CButton color="dark" onClick={() => setIsModal(false)}>
            OK
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal visible={blockModal} onDismiss={() => setBlockModal(false)} alignment="center">
        <CModalHeader onDismiss={() => setBlockModal(false)}>
          <CModalTitle>PreviewYour Update</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <PreviewBlock
            post={recommendationForm}
            experience={experience}
            requirement={speciality}
            description={[]}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={() => setBlockModal(false)}>
            Back
          </CButton>
          <CButton color="dark" onClick={handleSubmit}>
            OK
          </CButton>
        </CModalFooter>
      </CModal>
      <div className="d-flex flex-row align-items-center text-color-black">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="11" lg="9" xl="8">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Edit a recommendation?</h1>
                    <p className="text-medium-emphasis">Edit your recommendation</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="title"
                        data-tip="Use impressing title to get people's attention!"
                        value={recommendationForm.title?recommendationForm.title:"Title"}
                        name="title"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="title" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon content={freeSet.cilUser} />
                      </CInputGroupText>
                      <CFormControl
                        data-for="name"
                        data-tip="Enter your name"
                        value={recommendationForm.name?recommendationForm.name:"Name"}
                        name="name"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="name" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon content={freeSet.cilBraille} />
                      </CInputGroupText>
                      <CFormControl
                        data-for="workType"
                        data-tip="What's your desired work?"
                        value={recommendationForm.desireWorkType?recommendationForm.desireWorkType:"Desired Work Type"}
                        name="desireWorkType"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="workType" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon content={freeSet.cilPhone} />
                      </CInputGroupText>
                      <CFormControl
                        data-for="phone"
                        data-tip="Let others can call you!"
                        value={recommendationForm.contact?recommendationForm.contact:"Phone"}
                        name="contact"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="phone" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormControl
                        data-for="mail"
                        data-tip="Let others can email you!"
                        value={recommendationForm.email?recommendationForm.email:"Email"}
                        name="email"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="mail" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon content={freeSet.cilEducation} />
                      </CInputGroupText>
                      <CFormControl
                        data-for="diploma"
                        data-tip="Enter your highest education level"
                        value={recommendationForm.diploma?recommendationForm.diploma:"Diploma"}
                        name="diploma"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="diploma" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    {experience.map((exp, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon content={freeSet.cilAddressBook} />
                          </CInputGroupText>
                          <CFormControl
                            data-for="experience"
                            data-tip="Enter your experience"
                            placeholder="Experience"
                            name="experience"
                            value={exp}
                            onChange={(e) => handleInputArray(e, index)}
                          />
                          <ReactTooltip id="experience" place="top" type="dark" effect="solid" />
                          <CButton
                            type="button"
                            name="experience"
                            onClick={(e) => handleDeleteArray(e, index)}
                          >
                            x
                          </CButton>
                        </CInputGroup>
                      )
                    })}
                    {speciality.map((req, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon content={freeSet.cilThumbUp} />
                          </CInputGroupText>
                          <CFormControl
                            data-for="specialty"
                            data-tip="Enter your strength or other specialty"
                            placeholder="Speciality"
                            name="speciality"
                            value={req}
                            onChange={(e) => handleInputArray(e, index)}
                          />
                          <ReactTooltip id="specialty" place="top" type="dark" effect="solid" />
                          <CButton
                            type="button"
                            name="speciality"
                            onClick={(e) => handleDeleteArray(e, index)}
                          >
                            x
                          </CButton>
                        </CInputGroup>
                      )
                    })}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon name="cil-image" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="image"
                        data-tip="Put a picture that can represent you!"
                        id="formFile"
                        type="file"
                        onChange={handleChangeImage}
                      ></CFormControl>
                      <ReactTooltip id="image" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CRow className="justify-content-between mt-3">
                      <CCol xs={5} className="d-flex justify-content-center">
                        <CButton type="button" name="experience" onClick={addArray}>
                          Add experience
                        </CButton>
                      </CCol>
                      <CCol xs={5} className="d-flex justify-content-center">
                        <CButton type="button" name="speciality" onClick={addArray}>
                          Add speciality
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow className="justify-content-center mt-3">
                      <div className="d-flex d-flex justify-content-center">
                        <CButton color="dark" onClick={() => setBlockModal(true)}>
                          Done
                        </CButton>
                      </div>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}
EditBlock.propTypes = {
  data: PropTypes.object,
}
export default EditBlock
