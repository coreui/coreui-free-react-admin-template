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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
const formTemplate = {
  title: '',
  companyName: '',
  workType: '',
  salary: '',
  diploma: '',
  file: '',
}
const AddRecruitment = () => {
  const history = useHistory()
  const [isModal, setIsModal] = useState(false)
  const [previewURL, setPreviewURL] = useState(null)
  const [experience, setExperience] = useState([''])
  const [requirement, setRequirement] = useState([''])
  const [description, setDescription] = useState([''])
  const [fileButton, setFileButton] = useState(null)
  const [recruitmentForm, setRecruitmentForm] = useState(formTemplate)
  const handleInputChange = (e) => {
    setRecruitmentForm({ ...recruitmentForm, [e.target.name]: e.target.value })
  }
  const addArray = (e) => {
    if (e.target.name === 'experience') {
      const newArray = experience.concat([''])
      setExperience(newArray)
    } else if (e.target.name === 'requirement') {
      const newArray = requirement.concat([''])
      setRequirement(newArray)
    } else if (e.target.name === 'description') {
      const newArray = description.concat([''])
      setDescription(newArray)
    }
  }
  const handleInputArray = (e, index) => {
    if (e.target.name === 'experience') {
      const newArray = experience.map((exp, idx) => {
        if (idx !== index) return exp
        else return e.target.value
      })
      setExperience(newArray)
    } else if (e.target.name === 'requirement') {
      const newArray = requirement.map((req, idx) => {
        if (idx !== index) return req
        else return e.target.value
      })
      setRequirement(newArray)
    } else if (e.target.name === 'description') {
      const newArray = description.map((desc, idx) => {
        if (idx !== index) return desc
        else return e.target.value
      })
      setDescription(newArray)
    }
  }
  const handleDeleteArray = (e, index) => {
    if (e.target.name === 'experience') {
      const newArray = experience.filter((exp, idx) => idx !== index)
      setExperience(newArray)
    } else if (e.target.name === 'requirement') {
      const newArray = requirement.filter((req, idx) => idx !== index)
      setRequirement(newArray)
    } else if (e.target.name === 'description') {
      const newArray = description.filter((desc, idx) => idx !== index)
      setDescription(newArray)
    }
  }
  const handleChangeImage = (e) => {
    let reader = new FileReader()
    let file = e.target.files[0]
    setFileButton(e.target)
    setRecruitmentForm({ ...recruitmentForm, file: file })
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
    setRecruitmentForm({ ...recruitmentForm, file: null })
    fileButton.value = ''
  }
  const handleSubmit = () => {
    const post = {
      title: {
        title: recruitmentForm.title,
        company_name: recruitmentForm.companyName,
        work_type: recruitmentForm.workType,
      },
      info: {
        salary: recruitmentForm.salary,
        experience: experience,
        diploma: recruitmentForm.diploma,
      },
      spec: {
        requirement: requirement,
        description: description,
      },
      image: recruitmentForm.file,
    }
    console.log(post)
    history.push('/recruitment')
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
                    <h1>Ready to post a recruitment?</h1>
                    <p className="text-medium-emphasis">Create your recruitment</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon content={freeSet.cilLayers} />
                      </CInputGroupText>
                      <CFormControl
                        placeholder="The job title"
                        name="title"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon content={freeSet.cilBuilding} />
                      </CInputGroupText>
                      <CFormControl
                        placeholder="Company name"
                        name="companyName"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon content={freeSet.cilBraille} />
                      </CInputGroupText>
                      <CFormControl
                        placeholder="Work Type"
                        name="workType"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon content={freeSet.cilDollar} />
                      </CInputGroupText>
                      <CFormControl
                        placeholder="Salary"
                        name="salary"
                        onChange={handleInputChange}
                      />
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
                            placeholder="Required Experience"
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
                    {requirement.map((req, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon content={freeSet.cilThumbUp} />
                          </CInputGroupText>
                          <CFormControl
                            placeholder="Required skills"
                            name="requirement"
                            value={req}
                            onChange={(e) => handleInputArray(e, index)}
                          />
                          <CButton
                            type="button"
                            name="requirement"
                            onClick={(e) => handleDeleteArray(e, index)}
                          >
                            x
                          </CButton>
                        </CInputGroup>
                      )
                    })}
                    {description.map((desc, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon content={freeSet.cilDescription} />
                          </CInputGroupText>
                          <CFormControl
                            placeholder="description"
                            name="description"
                            value={desc}
                            onChange={(e) => handleInputArray(e, index)}
                          />
                          <CButton
                            type="button"
                            name="description"
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
                    <CRow className="mt-3">
                      <CCol xs={4} className="d-flex justify-content-center">
                        <CButton type="button" name="experience" onClick={addArray}>
                          Add required experience
                        </CButton>
                      </CCol>
                      <CCol xs={4} className="d-flex justify-content-center">
                        <CButton type="button" name="requirement" onClick={addArray}>
                          Add required skills
                        </CButton>
                      </CCol>
                      <CCol xs={4} className="d-flex justify-content-center">
                        <CButton type="button" name="description" onClick={addArray}>
                          Add description
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow className="justify-content-center mt-3">
                      <div className="d-flex d-flex justify-content-center">
                        <CButton color="dark" onClick={handleSubmit}>
                          Post A Recruitment
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

export default AddRecruitment
