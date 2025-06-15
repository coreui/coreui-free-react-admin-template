import {
  CButton,
  CCallout,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleEditProjectModalClose, editProjectAPI } from '../../actions/projectActions'
import { toast } from 'react-toastify'

const ModalEditProject = () => {
  const { user } = useSelector((state) => state.auth.user)

  const dispatch = useDispatch()
  const { projectIdToEdit, projectList, isEditProjectModalOpen } = useSelector(
    (state) => state.project,
  )

  const [key, setKey] = useState('')
  const [projectName, setProjectName] = useState('')
  const [projectType, setProjectType] = useState('')

  useEffect(() => {
    if (projectIdToEdit !== null) {
      const projectToEdit = projectList.find((config) => config.id === projectIdToEdit)
      if (projectToEdit) {
        setKey(projectToEdit.key)
        setProjectName(projectToEdit.projectName)
        setProjectType(projectToEdit.projectType)
      }
    }
  }, [projectIdToEdit, projectList])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!projectName || !projectType) {
      toast.error('Please fill in all required fields')
      return
    }
    dispatch(
      editProjectAPI(projectIdToEdit, {
        projectName,
        key,
        projectType,
        projectCategory: 'No category',
        projectLead: user.uid,
      }),
    )
  }
  return (
    <CModal
      visible={isEditProjectModalOpen}
      onClose={() => dispatch(toggleEditProjectModalClose())}
      backdrop="static"
      aria-labelledby="ScrollingLongContentExampleLabel LiveDemoExampleLabel"
      scrollable
      alignment="center"
    >
      <CModalHeader onClose={() => dispatch(toggleEditProjectModalClose())}>
        Modifier configuration Jira
      </CModalHeader>
      <CModalBody>
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
                disabled
                value={key}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6}>
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
            <CCol sm={6}>
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
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={(e) => handleFormSubmit(e)}>
          Edit Project
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalEditProject
