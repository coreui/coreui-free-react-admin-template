import React, { useState } from 'react'
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
  CButton,
  CFormTextarea,
  CFormCheck,
} from '@coreui/react'

const ProjectForm = ({ visible, setVisible, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    projectNumber: '',
    clientName: '',
    projectName: '',
    projectType: '',
    frozen: false,
    budget: '',
    remainingBudget: '',
    notes: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      frozen: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setVisible(false);
  };

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>{initialData ? 'Edit Project' : 'Create New Project'}</CModalHeader>
      <CForm onSubmit={handleSubmit}>
        <CModalBody>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="projectNumber">Project Number</CFormLabel>
              <CFormInput
                type="text"
                id="projectNumber"
                name="projectNumber"
                value={formData.projectNumber}
                onChange={handleInputChange}
                placeholder="Enter project number"
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="clientName">Client Name</CFormLabel>
              <CFormInput
                type="text"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                placeholder="Enter client name"
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="projectName">Project Name</CFormLabel>
              <CFormInput
                type="text"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                placeholder="Enter project name"
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="projectType">Project Type</CFormLabel>
              <CFormInput
                type="text"
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                placeholder="Enter project type"
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormCheck
                id="frozen"
                name="frozen"
                checked={formData.frozen}
                onChange={handleCheckboxChange}
              >
                Frozen
              </CFormCheck>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="budget">Budget</CFormLabel>
              <CFormInput
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="Enter budget"
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="remainingBudget">Remaining Budget</CFormLabel>
              <CFormInput
                type="number"
                id="remainingBudget"
                name="remainingBudget"
                value={formData.remainingBudget}
                onChange={handleInputChange}
                placeholder="Enter remaining budget"
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="notes">Notes</CFormLabel>
              <CFormTextarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Enter notes"
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" type="submit">
            {initialData ? 'Save Changes' : 'Create Project'}
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  );
};

export default ProjectForm;
