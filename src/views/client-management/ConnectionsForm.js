import React, { useState, useEffect } from 'react';
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CFormInput,
  CCol,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilSave, cilTrash } from '@coreui/icons';

const ConnectionsForm = ({ visible, setVisible, clientId }) => {
  const [connections, setConnections] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (clientId) {
      const fetchConnections = async () => {
        try {
          const response = await fetch(`http://localhost:3001/clients/${clientId}/connections`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setConnections(data);
        } catch (error) {
          console.error('Error fetching connections:', error);
        }
      };

      fetchConnections();
    }
  }, [clientId]);

  const handleAddConnection = () => {
    setConnections([...connections, { type: '', address: '', username: '', password: '', notes: '', isNew: true }]);
    setEditingIndex(connections.length);
  };

  const handleEditConnection = (index) => {
    setEditingIndex(index);
  };

  const handleSaveConnection = async (index) => {
    const connection = connections[index];
    const url = connection.isNew
      ? `http://localhost:3001/clients/${clientId}/connections`
      : `http://localhost:3001/clients/${clientId}/connections/${connection.id}`;
    const method = connection.isNew ? 'POST' : 'PUT';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(connection),
    });

    const savedConnection = await response.json();

    if (connection.isNew) {
      setConnections(connections.map((c, i) => (i === index ? savedConnection : c)));
    } else {
      setConnections(connections.map((c, i) => (i === index ? savedConnection : c)));
    }

    setEditingIndex(null);
  };

  const handleDeleteConnection = async (index) => {
    const connection = connections[index];
    if (!connection.isNew) {
      await fetch(`http://localhost:3001/clients/${clientId}/connections/${connection.id}`, {
        method: 'DELETE',
      });
    }
    setConnections(connections.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const updatedConnections = [...connections];
    updatedConnections[index][field] = value;
    setConnections(updatedConnections);
  };

  return (
    <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
      <CModalHeader>Manage Connections</CModalHeader>
      <CModalBody>
        <CButton color="primary" size="sm" onClick={handleAddConnection} className="mb-3">
          Add Connection
        </CButton>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>Type</CTableHeaderCell>
              <CTableHeaderCell>Address</CTableHeaderCell>
              <CTableHeaderCell>Username</CTableHeaderCell>
              <CTableHeaderCell>Password</CTableHeaderCell>
              <CTableHeaderCell>Notes</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {connections.map((connection, index) => (
              <CTableRow key={index}>
                <CTableDataCell>
                  {editingIndex === index ? (
                    <CFormInput
                      type="text"
                      value={connection.type}
                      onChange={(e) => handleInputChange(index, 'type', e.target.value)}
                    />
                  ) : (
                    connection.type
                  )}
                </CTableDataCell>
                <CTableDataCell>
                  {editingIndex === index ? (
                    <CFormInput
                      type="text"
                      value={connection.address}
                      onChange={(e) => handleInputChange(index, 'address', e.target.value)}
                    />
                  ) : (
                    connection.address
                  )}
                </CTableDataCell>
                <CTableDataCell>
                  {editingIndex === index ? (
                    <CFormInput
                      type="text"
                      value={connection.username}
                      onChange={(e) => handleInputChange(index, 'username', e.target.value)}
                    />
                  ) : (
                    connection.username
                  )}
                </CTableDataCell>
                <CTableDataCell>
                  {editingIndex === index ? (
                    <CFormInput
                      type="password"
                      value={connection.password}
                      onChange={(e) => handleInputChange(index, 'password', e.target.value)}
                    />
                  ) : (
                    connection.password
                  )}
                </CTableDataCell>
                <CTableDataCell>
                  {editingIndex === index ? (
                    <CFormInput
                      type="text"
                      value={connection.notes}
                      onChange={(e) => handleInputChange(index, 'notes', e.target.value)}
                    />
                  ) : (
                    connection.notes
                  )}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {editingIndex === index ? (
                    <CButton color="success" size="sm" onClick={() => handleSaveConnection(index)}>
                      <CIcon icon={cilSave} />
                    </CButton>
                  ) : (
                    <CButton color="warning" size="sm" className="me-2" onClick={() => handleEditConnection(index)}>
                      <CIcon icon={cilPencil} />
                    </CButton>
                  )}
                  <CButton color="danger" size="sm" onClick={() => handleDeleteConnection(index)}>
                    <CIcon icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ConnectionsForm;
