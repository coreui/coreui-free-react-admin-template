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
import { cilPencil, cilTrash, cilUser, cilContact } from '@coreui/icons';
import ClientForm from './ClientForm';
import ContactForm from './ContactForm';
import ConnectionsForm from './ConnectionsForm';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [currentClient, setCurrentClient] = useState(null);
  const [visible, setVisible] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [connectionsModalVisible, setConnectionsModalVisible] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:3001/clients');
        const data = await response.json();

        if (Array.isArray(data)) {
          setClients(data);
        } else {
          console.error("Data received is not an array:", data);
          setClients([]);
        }
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      }
    };
    fetchClients();
  }, []);

  const handleCreate = () => {
    setCurrentClient(null);
    setVisible(true);
  };

  const handleEdit = (client) => {
    setCurrentClient(client);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/clients/${id}`, {
      method: 'DELETE',
    });
    setClients(clients.filter(client => client.id !== id));
  };

  const handleSave = async (data) => {
    const url = currentClient
      ? `http://localhost:3001/clients/${currentClient.id}`
      : 'http://localhost:3001/clients';
    const method = currentClient ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const updatedClient = await response.json();

    if (currentClient) {
      setClients(clients.map(client => (client.id === updatedClient.id ? updatedClient : client)));
    } else {
      setClients([...clients, updatedClient]);
    }

    setVisible(false);
  };

  const handleManageContacts = (clientId) => {
    setSelectedClientId(clientId);
    setContactModalVisible(true);
  };

  const handleManageConnections = (clientId) => {
    setSelectedClientId(clientId);
    setConnectionsModalVisible(true);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Client Management</strong>
            <CButton color="primary" className="float-end" onClick={handleCreate}>
              Create Client
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilUser} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Client</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
                  <CTableHeaderCell>Type</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {clients.map((client, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell className="text-center">
                      <CAvatar size="md" src="avatar_placeholder.png" status="success" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{client.name}</div>
                      <div className="small text-body-secondary">
                        <span>{client.email}</span>
                        <br />
                        Registered: {new Date(client.createdAt).toLocaleDateString()}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">{client.country}</CTableDataCell>
                    <CTableDataCell>{client.type}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton color="info" size="sm" className="me-2" onClick={() => handleManageContacts(client.id)}>
                        <CIcon icon={cilContact} />
                      </CButton>
                      <CButton color="info" size="sm" className="me-2" onClick={() => handleManageConnections(client.id)}>
                        <CIcon icon={cilUser} />
                      </CButton>
                      <CButton color="warning" size="sm" className="me-2" onClick={() => handleEdit(client)}>
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton color="danger" size="sm" onClick={() => handleDelete(client.id)}>
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

      <ClientForm
        visible={visible}
        setVisible={setVisible}
        onSubmit={handleSave}
        initialData={currentClient}
      />

      <ContactForm
        visible={contactModalVisible}
        setVisible={setContactModalVisible}
        clientId={selectedClientId}
      />

      <ConnectionsForm
        visible={connectionsModalVisible}
        setVisible={setConnectionsModalVisible}
        clientId={selectedClientId}
      />
    </CRow>
  );
};

export default ClientManagement;
