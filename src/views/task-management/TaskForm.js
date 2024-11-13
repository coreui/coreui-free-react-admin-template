import React, { useState } from 'react';
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
  CFormSelect,
  CFormTextarea
} from '@coreui/react';

const TaskForm = ({ visible, setVisible, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    taskNumber: '',
    clientName: '',
    contactName: '',
    projectName: '',
    taskSubject: '',
    approvedHours: '',
    priority: '',
    taskDescription: '',
    attachedFiles: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setVisible(false);
  };

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>{initialData ? 'Edit Task' : 'Create New Task'}</CModalHeader>
      <CForm onSubmit={handleSubmit}>
        <CModalBody>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="taskNumber">Task Number</CFormLabel>
              <CFormInput
                type="text"
                id="taskNumber"
                name="taskNumber"
                value={formData.taskNumber}
                onChange={handleInputChange}
                placeholder="Enter task number"
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
              <CFormLabel htmlFor="contactName">Contact Name</CFormLabel>
              <CFormInput
                type="text"
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleInputChange}
                placeholder="Enter contact name"
                required
              />
            </CCol>
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
          </CRow>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="taskSubject">Task Subject</CFormLabel>
              <CFormInput
                type="text"
                id="taskSubject"
                name="taskSubject"
                value={formData.taskSubject}
                onChange={handleInputChange}
                placeholder="Enter task subject"
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="approvedHours">Approved Hours</CFormLabel>
              <CFormInput
                type="number"
                id="approvedHours"
                name="approvedHours"
                value={formData.approvedHours}
                onChange={handleInputChange}
                placeholder="Enter approved hours"
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="priority">Priority</CFormLabel>
              <CFormSelect
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="taskDescription">Task Description</CFormLabel>
              <CFormTextarea
                id="taskDescription"
                name="taskDescription"
                value={formData.taskDescription}
                onChange={handleInputChange}
                placeholder="Enter task description"
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="attachedFiles">Attached Files</CFormLabel>
              <CFormInput
                type="file"
                id="attachedFiles"
                name="attachedFiles"
                multiple
                onChange={(e) =>
                  setFormData({ ...formData, attachedFiles: e.target.files })
                }
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" type="submit">
            {initialData ? 'Save Changes' : 'Create Task'}
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  );
};

export default TaskForm;
