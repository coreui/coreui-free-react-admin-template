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
import TaskForm from './TaskForm';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:3001/clients/1/tasks'); // נניח clientId=1
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleCreate = () => {
    setCurrentTask(null);
    setVisible(true);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/clients/1/tasks/${id}`, { // נניח clientId=1
      method: 'DELETE',
    });
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleSave = async (data) => {
    const url = currentTask
      ? `http://localhost:3001/clients/1/tasks/${currentTask.id}`
      : 'http://localhost:3001/clients/1/tasks';
    const method = currentTask ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const updatedTask = await response.json();

    if (currentTask) {
      setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    } else {
      setTasks([...tasks, updatedTask]);
    }

    setVisible(false);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Task Management</strong>
            <CButton color="primary" className="float-end" onClick={handleCreate}>
              Create Task
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilUser} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Task</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Client</CTableHeaderCell>
                  <CTableHeaderCell>Project</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {tasks.map((task, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell className="text-center">
                      <CAvatar size="md" src="avatar_placeholder.png" status="success" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{task.taskSubject}</div>
                      <div className="small text-body-secondary">
                        <span>{task.clientName}</span>
                        <br />
                        Project: {task.projectName}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">{task.projectName}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton color="warning" size="sm" className="me-2" onClick={() => handleEdit(task)}>
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton color="danger" size="sm" onClick={() => handleDelete(task.id)}>
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

      <TaskForm
        visible={visible}
        setVisible={setVisible}
        onSubmit={handleSave}
        initialData={currentTask}
      />
    </CRow>
  );
};

export default TaskManagement;
