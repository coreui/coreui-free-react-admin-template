import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilEnvelopeOpen } from '@coreui/icons';
import { Link } from 'react-router-dom';

const ResetPasswordEmail = ({ onContinue }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleResetPasswordEmail = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/send-reset-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess('An email with the code has been sent to your email.');
        onContinue(); // Move to the next form
      } else {
        const errorText = await response.text();
        setError(errorText || 'Error sending email');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleResetPasswordEmail}>
                  <h1>Password Recovery</h1>
                  <p className="text-body-secondary">Enter your email to receive the code for password recovery.</p>
                  {error && <p className="text-danger">{error}</p>}
                  {success && <p className="text-success">{success}</p>}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilEnvelopeOpen} />
                    </CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="primary" type="submit">
                      Continue
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ResetPasswordEmail;