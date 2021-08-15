/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
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
import axios from 'axios'
import PreviewBlock from './previewBlock'
const EditBlock = ({ data }) => {
  const EditFormTemplate = {
    title: data.title.title,
    companyName: data.title.company_name,
    workType: data.title.work_type,
    salary: data.info.salary,
    diploma: data.info.diploma,
    file: data.image,
    id: data._id,
  }
  const history = useHistory()
  const [imageModal, setImageModal] = useState(false)
  const [blockModal, setBlockModal] = useState(false)
  const [previewURL, setPreviewURL] = useState(null)
  const [experience, setExperience] = useState(data.info.experience)
  const [requirement, setRequirement] = useState(data.spec.requirement)
  const [description, setDescription] = useState(data.spec.description)
  const [fileButton, setFileButton] = useState(null)
  const [editForm, setEditForm] = useState(EditFormTemplate)
  const handleInputChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
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
    setEditForm({ ...editForm, file: file })
    reader.onloadend = () => {
      setPreviewURL(reader.result)
    }
    reader.readAsDataURL(file)
    // call the modal
    setImageModal(true)
  }

  const clearImage = (e) => {
    setImageModal(false)
    setPreviewURL(null)
    setEditForm({ ...editForm, file: null })
    fileButton.value = ''
  }
  const handleSubmit = () => {
    const post = {
      _id: editForm.id,
      title: editForm.title,
      company_name: editForm.companyName,
      work_type: editForm.workType,
      salary: editForm.salary,
      experience: experience.filter((exp) => exp !== ''),
      diploma: editForm.diploma,
      requirement: requirement.filter((req) => req !== ''),
      description: description.filter((des) => des !== ''),
      file: editForm.file,
    }
    console.log('this is post:', post)
    axios
      .patch('/api/recruitment', post, { 'content-type': 'multipart/form-data' })
      .then(() => {
        alert('已更新')
        history.push('/profile')
      })
      .catch((err) => {
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
  }

  return (
    <>
      <CModal visible={imageModal} onDismiss={() => setImageModal(false)} alignment="center">
        <CModalHeader onDismiss={() => setImageModal(false)}>
          <CModalTitle>Preview Your Photo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <img src={previewURL} className="img-fluid container justify-content-center d-flex" />
        </CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={clearImage}>
            Clear
          </CButton>
          <CButton color="dark" onClick={() => setImageModal(false)}>
            OK
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal visible={blockModal} onDismiss={() => setBlockModal(false)} alignment="center">
        <CModalHeader onDismiss={() => setBlockModal(false)}>
          <CModalTitle>Preview Your Update</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <PreviewBlock
            post={editForm}
            experience={experience}
            requirement={requirement}
            description={description}
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
                    <h1>Edit a recruitment?</h1>
                    <p className="text-medium-emphasis">Edit your recruitment</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon content={freeSet.cilLayers} />
                      </CInputGroupText>
                      <CFormControl
                        placeholder={data.title.title}
                        name="title"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon content={freeSet.cilBuilding} />
                      </CInputGroupText>
                      <CFormControl
                        placeholder={data.title.company_name}
                        name="companyName"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon content={freeSet.cilBraille} />
                      </CInputGroupText>
                      <CFormControl
                        placeholder={data.title.work_type}
                        name="workType"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon content={freeSet.cilDollar} />
                      </CInputGroupText>
                      <CFormControl
                        placeholder={data.info.salary}
                        name="salary"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon content={freeSet.cilEducation} />
                      </CInputGroupText>
                      <CFormControl
                        placeholder={data.info.diploma}
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
                            placeholder={experience[index] || 'Required Experience'}
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
                            placeholder={requirement[index] || 'Required Skill'}
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
                            placeholder={description[index] || 'Description'}
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
                        placeholder={data.image}
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
