/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectLogin } from '../../../slices/loginSlice'
import { selectCareer, clearCroppedDataUrl, clearCroppedFile } from '../../../slices/careerSlice'
import { useHistory } from 'react-router'
import CareerImageEditor from '../career/CareerImageEditor'
import ReactTooltip from 'react-tooltip'
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
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import CareerPreview from '../career/CareerPreview'
const RecommendationForm = ({ data }) => {
  const add = data ? false : true
  const { cellphone: userPhone, email: userEmail, name: userName } = useSelector(selectLogin)
  const formTemplate = add
    ? {
        title: '',
        name: userName,
        desireWorkType: '',
        contact: userPhone,
        email: userEmail,
        diploma: '',
        file: '',
      }
    : {
        title: data.title.title,
        name: data.title.name,
        desireWorkType: data.title.desire_work_type,
        contact: data.info.contact,
        email: data.info.email,
        diploma: data.info.diploma,
        file: data.image,
        _id: data._id,
      }
  const dispatch = useDispatch()
  const history = useHistory()
  const { croppedFile } = useSelector(selectCareer)
  const [isModal, setIsModal] = useState(false)
  const [blockModal, setBlockModal] = useState(false)
  const [originalImage, setOriginalImage] = useState(null)
  const [experience, setExperience] = useState(add ? [''] : data.spec.experience)
  const [speciality, setSpeciality] = useState(add ? [''] : data.spec.speciality)
  const [fileButton, setFileButton] = useState(null)
  const [dataForm, setDataForm] = useState(formTemplate)
  const [requiredStyle, setRequiredStyle] = useState({
    title: '',
    name: '',
    desireWorkType: '',
  })
  const handleInputChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value })
    if (requiredStyle.hasOwnProperty(e.target.name)) {
      if (e.target.value === '')
        setRequiredStyle({ ...requiredStyle, [e.target.name]: 'border-3 border-danger' })
      else setRequiredStyle({ ...requiredStyle, [e.target.name]: '' })
    }
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
    // clear old edit image
    dispatch(clearCroppedDataUrl())
    dispatch(clearCroppedFile())
    reader.onloadend = () => {
      setOriginalImage(reader.result)
    }
    reader.readAsDataURL(file)
    // call the modal
    setIsModal(true)
  }

  const clearImage = (e) => {
    // close modal
    setIsModal(false)
    // clear all the image
    setOriginalImage(null)
    dispatch(clearCroppedDataUrl())
    dispatch(clearCroppedFile())
    setDataForm({ ...dataForm, file: null })
    fileButton.value = ''
  }

  const saveEditImage = (e) => {
    // close the modal
    setIsModal(false)
    // fill the form
    setDataForm({ ...dataForm, file: croppedFile })
  }

  const handleSubmit = () => {
    const data = new FormData()
    data.append('title', dataForm.title)
    data.append('name', dataForm.name)
    data.append('desire_work_type', dataForm.desireWorkType)
    data.append('contact', dataForm.contact)
    data.append('email', dataForm.email)
    data.append('diploma', dataForm.diploma)
    for (let exp of experience) {
      data.append('experience[]', exp)
    }
    for (let spec of speciality) {
      data.append('speciality[]', spec)
    }
    if (croppedFile) {
      data.append('file', dataForm.file, '.png')
    }
    const config = { 'content-type': 'multipart/form-data' }
    if (add) {
      axios
        .post('/api/recommendation', data, config)
        .then(() => {
          alert('已新增')
          history.push('/own_recommendation')
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    } else {
      data.append('_id', dataForm._id)
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
  }
  return (
    <>
      <CModal size="xl" visible={isModal} onDismiss={() => setIsModal(false)} alignment="center">
        <CModalHeader onDismiss={() => setIsModal(false)}>
          <CModalTitle>Edit Your Photo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CareerImageEditor imgSrc={originalImage} />
        </CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={clearImage}>
            Clear
          </CButton>
          <CButton color="dark" onClick={saveEditImage} disabled={!croppedFile}>
            OK
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal visible={blockModal} onDismiss={() => setBlockModal(false)} alignment="center">
        <CModalHeader onDismiss={() => setBlockModal(false)}>
          <CModalTitle>Preview New Post</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CareerPreview
            post={dataForm}
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
            Post
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
                    <h1>{add ? 'Ready to post' : 'Want to edit'} a recommendation?</h1>
                    <p className="text-medium-emphasis">
                      {add ? 'Create' : 'Edit'} your recommendation
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-image" name="cil-image" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="image"
                        data-tip="Put a picture that can represent you!"
                        id="formFile"
                        type="file"
                        onChange={handleChangeImage}
                        onClick={(e) => (e.target.value = null)}
                      ></CFormControl>
                      <ReactTooltip id="image" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-user" name="cil-user" />
                      </CInputGroupText>
                      <CFormControl
                        className={requiredStyle.title}
                        data-for="title"
                        data-tip="Use impressing title to get people's attention!"
                        placeholder="Title*"
                        value={dataForm.title}
                        name="title"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="title" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-user" name="cil-user" />
                      </CInputGroupText>
                      <CFormControl
                        className={requiredStyle.name}
                        data-for="name"
                        data-tip="Enter your name"
                        placeholder="Name*"
                        value={dataForm.name}
                        name="name"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="name" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-braille" name="cil-braille" />
                      </CInputGroupText>
                      <CFormControl
                        className={requiredStyle.desireWorkType}
                        data-for="workType"
                        data-tip="What's your desired work?"
                        placeholder="Desired Work Type*"
                        value={dataForm.desireWorkType}
                        name="desireWorkType"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="workType" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon="cil-phone" name="cil-phone" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="phone"
                        data-tip="Let others can call you!"
                        placeholder="Phone"
                        value={dataForm.contact}
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
                        placeholder="Email"
                        value={dataForm.email}
                        name="email"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="mail" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-education" name="cil-education" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="diploma"
                        data-tip="Enter your highest education level"
                        placeholder="Diploma"
                        value={dataForm.diploma}
                        name="diploma"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="diploma" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    {experience.map((exp, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-address-book" name="cil-address-book" />
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
                    <CInputGroup className="mb-4 d-flex flex-row">
                      <CInputGroupText>
                        <CIcon icon="cil-address-book" name="cil-address-book" />
                      </CInputGroupText>
                      <CButton
                        type="button"
                        name="experience"
                        className="form-add"
                        onClick={addArray}
                      >
                        +
                      </CButton>
                    </CInputGroup>
                    {speciality.map((req, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-thumb-up" name="cil-thumb-up" />
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
                    <CInputGroup className="mb-4 d-flex flex-row">
                      <CInputGroupText>
                        <CIcon icon="cil-thumb-up" name="cil-thumb-up" />
                      </CInputGroupText>
                      <CButton
                        type="button"
                        name="speciality"
                        className="form-add"
                        onClick={addArray}
                      >
                        +
                      </CButton>
                    </CInputGroup>
                    <CRow className="justify-content-center mt-3">
                      <div className="d-flex d-flex justify-content-center">
                        <CButton
                          color="dark"
                          onClick={() => {
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
                            setBlockModal(true)
                          }}
                        >
                          Preview
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
RecommendationForm.propTypes = {
  data: PropTypes.object,
}
export default RecommendationForm
