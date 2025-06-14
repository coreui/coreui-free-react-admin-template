import React, { useEffect, useState } from 'react'
import { CButton, CCallout, CCol, CForm, CFormInput, CFormSelect, CRow } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addNewProjectAPI } from '../../actions/projectActions'

const AddNewProject = () => {
  const { user } = useSelector((state) => state.auth.user)
  const [projectName, setProjectName] = useState('')
  const [key, setKey] = useState('')
  const [projectType, setProjectType] = useState('')
  const dispatch = useDispatch()
  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!projectName || !key || !projectType) {
      toast.error('Please fill in all required fields')
      return
    }
    if (key.length < 3) {
      toast.error('Key must be at least 3 characters long')
      return
    }
    if (!/^[A-Z]+$/.test(key)) {
      toast.error('Key must contain only uppercase letters')
      return
    }
    dispatch(
      addNewProjectAPI({
        projectName,
        key,
        projectType,
        projectCategory: 'No category',
        projectLead: user.uid,
      }),
    )
  }

  return (
    <CForm>
      <CRow>
        <CCol sm={8}>
          <CFormInput
            type="text"
            id="FormControlInputHostURL"
            label="Project Name"
            placeholder="project name"
            aria-describedby="exampleFormControlInputHelpInline"
            required
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
          />
        </CCol>
        <CCol sm={4}>
          <CFormInput
            type="test"
            id="FormControlInputUsername"
            label="Key"
            aria-describedby="exampleFormControlInputHelpInline"
            required
            value={key}
            onChange={(e) => setKey(e.target.value.toUpperCase())}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={4}>
          <CFormSelect
            id="FormControlSelectProjectType"
            label="Project Type"
            aria-label="Project Type"
            options={[
              { label: '' },
              { label: 'Software', value: 'software' },
              { label: 'Business', value: 'business' },
            ]}
            onChange={(e) => e.target.value && setProjectType(e.target.value)}
            value={projectType}
          />
        </CCol>
        <CCol sm={4}>
          <CFormInput
            type="test"
            id="FormControlInputUsername"
            label="Project Category"
            aria-describedby="exampleFormControlInputHelpInline"
            required
            value="No category"
            disabled
          />
        </CCol>
      </CRow>
      <CFormInput
        type="text"
        id="FormControlInputUsername"
        label="Project Lead"
        aria-describedby="exampleFormControlInputHelpInline"
        required
        value={user.FirstName.concat(' ', user.LastName)}
        disabled
        text="Le Project Lead est automatiquement défini comme l'utilisateur qui crée le projet"
      />
      <br />
      <div className="d-flex gap-2">
        <CButton color="primary" type="submit" onClick={(e) => handleFormSubmit(e)}>
          Add new Project
        </CButton>
      </div>
    </CForm>
  )
}
export default AddNewProject
