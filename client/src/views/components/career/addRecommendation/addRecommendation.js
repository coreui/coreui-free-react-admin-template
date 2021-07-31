/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useHistory } from 'react-router'
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
  CLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
const formTemplate = {
  title: '',
  name: '',
  desireWorkType: '',
  contact: '',
  email: '',
  diploma: '',
  file: '',
}
const AddRecommendation = () => {
  const history = useHistory()
  const [isModal, setIsModal] = useState(false)
  const [previewURL, setPreviewURL] = useState(null)
  const [experience, setExperience] = useState([''])
  const [speciality, setSpeciality] = useState([''])
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
    const post = {
      title: {
        title: recommendationForm.title,
        name: recommendationForm.name,
        desire_work_type: recommendationForm.desireWorkType,
      },
      info: {
        contact: recommendationForm.contact,
        email: recommendationForm.email,
        diploma: recommendationForm.diploma,
      },
      spec: {
        experience: experience,
        speciality: speciality,
      },
      image: recommendationForm.file,
    }
    console.log(post)
    history.push('/recommendation')
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
      <div className="d-flex flex-row align-items-center text-color-black">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="11" lg="9" xl="8">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Ready to post a recommendation?</h1>
                    <p className="text-medium-emphasis">Create your recommendation</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                      <CFormControl placeholder="Title" name="title" onChange={handleInputChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon content={freeSet.cilUser} />
                      </CInputGroupText>
                      <CFormControl placeholder="Name" name="name" onChange={handleInputChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon content={freeSet.cilBraille} />
                      </CInputGroupText>
                      <CFormControl
                        placeholder="Desired Work Type"
                        name="desireWorkType"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon content={freeSet.cilPhone} />
                      </CInputGroupText>
                      <CFormControl
                        placeholder="Phone"
                        name="contact"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormControl placeholder="Email" name="email" onChange={handleInputChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon content={freeSet.cilEducation} />
                      </CInputGroupText>
                      <CFormControl
                        placeholder="Diploma"
                        name="diploma"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    {experience.map((exp, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon content={freeSet.cilAddressBook} />
                          </CInputGroupText>
                          <CFormControl
                            placeholder="Experience"
                            name="experience"
                            value={exp}
                            onChange={(e) => handleInputArray(e, index)}
                          />
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
                            placeholder="Speciality"
                            name="speciality"
                            value={req}
                            onChange={(e) => handleInputArray(e, index)}
                          />
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
                        id="formFile"
                        type="file"
                        onChange={handleChangeImage}
                      ></CFormControl>
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
                        <CButton color="dark" onClick={handleSubmit}>
                          Post A Recommendation
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

export default AddRecommendation
