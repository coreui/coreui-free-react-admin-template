import React, { useState, useEffect } from 'react';
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash, cilUser } from '@coreui/icons';
import ProjectForm from './ProjectForm';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('http://localhost:3001/clients/1/projects'); // נניח clientId=1
      const data = await response.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const handleCreate = () => {
    setCurrentProject(null);
    setVisible(true);
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/clients/1/projects/${id}`, { // נניח clientId=1
      method: 'DELETE',
    });
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleSave = async (data) => {
    const url = currentProject
      ? `http://localhost:3001/clients/1/projects/${currentProject.id}`
      : 'http://localhost:3001/clients/1/projects';
    const method = currentProject ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const updatedProject = await response.json();

    if (currentProject) {
      setProjects(projects.map(project => (project.id === updatedProject.id ? updatedProject : project)));
    } else {
      setProjects([...projects, updatedProject]);
    }

    setVisible(false);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Project Management</strong>
            <CButton color="primary" className="float-end" onClick={handleCreate}>
              Create Project
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilUser} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Project</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Client</CTableHeaderCell>
                  <CTableHeaderCell>Type</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {projects.map((project, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell className="text-center">
                      <CAvatar size="md" src="avatar_placeholder.png" status="success" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{project.projectName}</div>
                      <div className="small text-body-secondary">
                        <span>{project.clientName}</span>
                        <br />
                        Type: {project.projectType}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">{project.projectType}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton color="warning" size="sm" className="me-2" onClick={() => handleEdit(project)}>
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton color="danger" size="sm" onClick={() => handleDelete(project.id)}>
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <ProjectForm
        visible={visible}
        setVisible={setVisible}
        onSubmit={handleSave}
        initialData={currentProject}
      />
    </CRow>
  );
};

export default ProjectManagement;
