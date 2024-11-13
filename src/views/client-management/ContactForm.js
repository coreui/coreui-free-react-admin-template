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
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilSave, cilTrash } from '@coreui/icons';

const ContactForm = ({ visible, setVisible, clientId }) => {
  const [contacts, setContacts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (clientId) {
      const fetchContacts = async () => {
        try {
          const response = await fetch(`http://localhost:3001/clients/${clientId}/contacts`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setContacts(data);
        } catch (error) {
          console.error('Error fetching contacts:', error);
        }
      };

      fetchContacts();
    }
  }, [clientId]);

  const handleAddContact = () => {
    setContacts([...contacts, { name: '', email: '', phone: '', isNew: true }]);
    setEditingIndex(contacts.length);
  };

  const handleEditContact = (index) => {
    setEditingIndex(index);
  };

  const handleSaveContact = async (index) => {
    const contact = contacts[index];
    const url = contact.isNew
      ? `http://localhost:3001/clients/${clientId}/contacts`
      : `http://localhost:3001/clients/${clientId}/contacts/${contact.id}`;
    const method = contact.isNew ? 'POST' : 'PUT';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    const savedContact = await response.json();

    if (contact.isNew) {
      setContacts(contacts.map((c, i) => (i === index ? savedContact : c)));
    } else {
      setContacts(contacts.map((c, i) => (i === index ? savedContact : c)));
    }

    setEditingIndex(null);
  };

  const handleDeleteContact = async (index) => {
    const contact = contacts[index];
    if (!contact.isNew) {
      await fetch(`http://localhost:3001/clients/${clientId}/contacts/${contact.id}`, {
        method: 'DELETE',
      });
    }
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][field] = value;
    setContacts(updatedContacts);
  };

  return (
    <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
      <CModalHeader>Manage Contacts</CModalHeader>
      <CModalBody>
        <CButton color="primary" size="sm" onClick={handleAddContact} className="mb-3">
          Add Contact
        </CButton>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {contacts.map((contact, index) => (
              <CTableRow key={index}>
                <CTableDataCell>
                  {editingIndex === index ? (
                    <CFormInput
                      type="text"
                      value={contact.name}
                      onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    />
                  ) : (
                    contact.name
                  )}
                </CTableDataCell>
                <CTableDataCell>
                  {editingIndex === index ? (
                    <CFormInput
                      type="email"
                      value={contact.email}
                      onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                    />
                  ) : (
                    contact.email
                  )}
                </CTableDataCell>
                <CTableDataCell>
                  {editingIndex === index ? (
                    <CFormInput
                      type="text"
                      value={contact.phone}
                      onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                    />
                  ) : (
                    contact.phone
                  )}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {editingIndex === index ? (
                    <CButton color="success" size="sm" onClick={() => handleSaveContact(index)}>
                      <CIcon icon={cilSave} />
                    </CButton>
                  ) : (
                    <CButton color="warning" size="sm" className="me-2" onClick={() => handleEditContact(index)}>
                      <CIcon icon={cilPencil} />
                    </CButton>
                  )}
                  <CButton color="danger" size="sm" onClick={() => handleDeleteContact(index)}>
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

export default ContactForm;
